<script>
    import Katex from 'svelte-katex';
    import Highlight from "svelte-highlight";
    import python from "svelte-highlight/languages/python";

    import "svelte-highlight/styles/github-dark-dimmed.css";

    import ArticleTemplate from "$lib/ArticleTemplate.svelte";
    import ArticleAbstract from "$lib/ArticleAbstract.svelte";
    import ArticleSection from "$lib/ArticleSection.svelte";
    import Citation from "$lib/Citation.svelte";
    import References from "$lib/References.svelte";

    let citations = {
        szeliski: {
            index: 1,
            title: "Computer vision: algorithms and applications",
            author: "Richard Szeliski",
            year: "2022",
            link: "https://szeliski.org/Book/"
        },
        hartley: {
            index: 2,
            title: "Multiple view geometry in computer vision",
            author: "Richard Hartley and Andrew Zisserman",
            year: "2003",
            link: "https://www.cambridge.org/core/books/multiple-view-geometry-in-computer-vision/0B6F289C78B2B23F596CAA76D3D43F7A"
        },
        boykov: {
            index: 3,
            title: "Fast approximate energy minimization via graph cuts",
            author: "Yuri Boykov, Olga Veksler, and Ramin Zabih",
            year: "2002",
            link: "https://www.cs.cornell.edu/rdz/Papers/BVZ-iccv99.pdf"
        }, 
        hirschmuller: {
            index: 4,
            title: "Stereo processing by semiglobal matching and mutual information",
            author: "Heiko Hirschmuller",
            year: "2007",
            link: "https://elib.dlr.de/55367/1/Stereo_Processing-Hirschm%C3%BCller.pdf"
        }
    }
</script>

<ArticleTemplate title="Stereo Reconstruction from Scratch" date="27. April 2025">
    <ArticleAbstract>
        This blog post describes my implementation of a stereo matching algorithm for rectified images from scratch. I will explain the theory behind stereo matching and walk you through my implementation step by step. The project is implemented in Python and the code is available on <a href="https://github.com/chrisdalvit/stereo-reconstruction" target="_blank">GitHub</a>. Apart from some image processing basics and Python fundamentals, no prior knowledge is required. Feel free to check it out and contact me if you have any questions or comments.
    </ArticleAbstract>
    <figure>
        <div class="image-container">
            <img class="img-600" src="stereo-reconstruction/result.gif" alt="Final 3D reconstruction of a sample scene."/>
        </div>
        <figcaption>
            Final 3D reconstruction of a sample scene.
        </figcaption>
    </figure>
    <ArticleSection title="Theory" id="theory">
        <p>
            Stereo matching is the process of taking two images and constructing a 3D model of the scene by identifying corresponding pixels in both images. The objective is to convert 2D pixel positions into 3D depth information <Citation citation={citations.szeliski} />. The theoretical foundation of stereo matching is <i>epipolar geometry</i>. Let's take a look at the following figure.
        </p>
        <figure>
            <div class="image-container">
                <img class="img-300" src="stereo-reconstruction/epipolar.png" alt="Schematic explaining epipolar geometry."/>
            </div>
            <figcaption>
                Schematic of epipolar geometry. Image taken from <Citation citation={citations.szeliski} />
            </figcaption>
        </figure>
        <p>
            <Katex>c_0</Katex> and <Katex>c_1</Katex> are the centers of the left and right cameras for a given stereo setup. The baseline is the line connecting <Katex>c_0</Katex> and <Katex>c_1</Katex>. A real-world 3D point <Katex>p</Katex> projects onto the image planes as points <Katex>x_0</Katex> and <Katex>x_1</Katex>. The key geometric constraint is that the three points <Katex>c_0</Katex>, <Katex>p</Katex>, and <Katex>c_1</Katex> define a plane called the epipolar plane. Each epipolar plane intersects the image planes along lines called epipolar lines, denoted as <Katex>l_0</Katex> and <Katex>l_1</Katex> <Citation citation={citations.hartley}/>. This implies that given a point <Katex>x_0</Katex> in the left image, its corresponding point <Katex>x_1</Katex> in the right image must lie on the corresponding epipolar line <Katex>l_1</Katex> <Citation citation={citations.hartley}/>. This constraint significantly reduces the search space for matching points from the whole 2D image plane, down to a single line. <br/>
            Although epipolar geometry applies to any roto-translation between <Katex>c_0</Katex> and <Katex>c_1</Katex>, images are often rectified in practice <Citation citation={citations.szeliski} />. Rectification involves warping the input images so that corresponding horizontal scanlines become epipolar lines <Citation citation={citations.szeliski} />. This transformation results in the following relationship between the pixel coordinates <Katex>x_0 = (u_0, v_0)</Katex> and <Katex>x_1 = (u_1, v_1)</Katex>
        </p>
        <Katex displayMode>
            u_1 = u_0 + d(u_0,v_0) \qquad v_1 =v_0 
        </Katex>
        <p>
            where <Katex>d(u_0,v_0)</Katex> is called the disparity at pixel location <Katex>x_0</Katex>. This means that corresponding points can be found along the same horizontal line, by simply adding an offset. Collecting the disparities for all image locations produces the disparity map. For the purposes of this project, it is always assumed that the input images are rectified. Once the disparity <Katex>d(u_0,v_0)</Katex> is known the following projection equation can be rearranged to obtain the depth <Katex>Z</Katex> of the point <Katex>p</Katex>
        </p>
        <Katex displayMode>
            d(u_0,v_0) = f \frac{"{B}"}{"{Z}"}
        </Katex>
        <p>
            Here <Katex>f</Katex> is the focal length (a property of the camera) and <Katex>B</Katex> is the baseline (the distance between the two cameras). The main question is now, how can <Katex>d(u_0,v_0)</Katex> be computed?
        </p>
        <p>
            As the image capturing process is inherently affected by noise, the exact disparity cannot be computed. Therefore, the disparity needs to be estimated. Various approaches exist for estimating the disparity, discussing all of them is beyond the scope of this blog post. We focus on two popular groups of approaches:
        </p>
        <ul>
            <li>
                Local methods: These methods aggregate the matching cost by summing or averaging over a support region <Citation citation={citations.szeliski}/>. A cost function <Katex>C(u, v, d)</Katex> is computed over this region, and the estimated disparity <Katex>d^*</Katex> is then the disparity that minimizes the cost
                <Katex displayMode>
                    d^* = \underset{"{d}"}{"{\\text{argmin}}"} ~ C(u, v, d)
                </Katex>
            </li> 
            <li>
                Global methods: These methods are formulated within an energy-minimization framework, where the objective is to find a disparity function <Katex>d</Katex> that minimizes a global energy
                <Katex displayMode>
                    E(d) = E_D(d) + \lambda E_S(d)
                </Katex>
                where <Katex>E_D(d)</Katex> measures how well the disparity function agrees with the input image pair, and <Katex>E_S(d)</Katex> enforces smoothness constraints, i.e., that neighboring pixels should have similar disparity values <Citation citation={citations.szeliski}/>. Performing this energy minimization in the 2D plane is known to be NP-hard <Citation citation={citations.szeliski}/>. However, for the 1D case, efficient algorithms exist to solve the energy-minimization problem <Citation citation={citations.boykov}/>. Combining multiple 1D optimization directions and aggregating their path costs leads to semi-global matching methods <Citation citation={citations.hirschmuller} />. Semi-global matching algorithms are both efficient and perform well in practice <Citation citation={citations.szeliski}/>.
            </li>
        </ul>
        <p>
            In the next section one implementation from each group is described in detail. 
        </p>
    </ArticleSection>
    <ArticleSection title="Implementation" id="Implementation">
        <p>
            In this project two different algorithms are implemented: a local method and a global method. The local method is a simple block matching algorithm, while the global method is a semi-global matching algorithm. Let's take a look at the local method first.
        </p>
        <p>
            <i>Block matching</i> is one of the simplest local stereo matching approaches. In this project, block matching is implemented by moving a window along the corresponding horizontal line in the right image <Katex>I_1</Katex> for every pixel <Katex>(u,v)</Katex> in the left image <Katex>I_0</Katex>. For every offset <Katex>d \in {"{ \\{0,\\dots,D \\}}"}</Katex>, the cost <Katex>C(u,v,d)</Katex> is computed, where <Katex>D</Katex> is the fixed maximum disparity. In the implementation, the average sum of squared differences is used as the matching cost function
        </p>
        <Katex displayMode>
            C(u,v,d) = \frac{"{1}"}{"{N}"} \sum_{"{(i,j) \\in R}"} {"{[}"}I_0(u+i,v+j) - I_1(u+i-d,v+j){"{]^2}"}
        </Katex>
        <p>
            The estimated disparity <Katex>d^*</Katex> is then the disparity with the lowest cost 
        </p>
        <Katex displayMode>
            d^* = \underset{"{d}"}{"{\\text{argmin}}"} ~ C(u, v, d)
        </Katex>
        <p>
            In the project implementation, a window size of 15 and a maximum disparity D of 64 were used. Note that the offset is subtracted from the image coordinates. Following the projection rules for rectified images, the image coordinates of a point in the right image are farther left than the coordinates of the same point in the left image. This algorithm can directly be implemented in Python. Here is a simplified version of my implementation.
        </p>
        <Highlight language={python} code={
`class BM:
    
    def __init__(self):
        self.kernel_size = 15
        self.max_disparity = 64
        self.kernel_half = 7
        # offset_adjust is used to map depth map output to 0-255 range
        self.offset_adjust = 255 / self.max_disparity  
        
    def _get_window(self, y, x, img, offset=0):
        """Get the window centered at (y, x) with the given offset"""
        y_start = y-self.kernel_half
        y_end = y+self.kernel_half
        x_start = x-self.kernel_half-offset+1
        x_end = x+self.kernel_half-offset+1
        return img[y_start:y_end,x_start:x_end]
    
    def compute(self, left, right):
        h, w = left.shape
        disp_map = np.zeros_like(left, dtype=np.float32)
        for y in range(self.kernel_half, h - self.kernel_half):      
            for x in range(self.max_disparity, w - self.kernel_half):
                best_offset = None
                min_error = float("inf")
                errors = []
                for offset in range(self.max_disparity):               
                    W_left = self._get_window(y, x, left)
                    W_right = self._get_window(y, x, right, offset)
                    if W_left.shape != W_right.shape:
                        errors.append(None)
                        continue
                    error = np.sum((W_left - W_right)**2)
                    errors.append(np.float32(error))
                    if error < min_error:
                        min_error = error
                        best_offset = offset
                disp_map[y, x] = best_offset * self.offset_adjust
        return disp_map
`
        }/>
    <p>
        The important stuff happens in the <code>compute</code> method. At the beginning the disparity map is initialized to zeros. Then, for every pixel in the left image, a window is extracted from the left image and the right image. The window is centered at the pixel location <code>(y,x)</code> in the left image and at <code>(y,x-offset)</code> in the right image. The offset is varied from 0 to <code>max_disparity</code>. The sum of squared differences between the two windows is computed and stored in a list. The offset with the lowest cost is then assigned to the disparity map. The final disparity map is scaled to fit into the range of 0-255.
    </p>
    </ArticleSection>
    <ArticleSection title="Sub-Pixel Estimation" id="sub-pixel-estimation">
        Introduction
    </ArticleSection>
    <ArticleSection title="Results" id="results">
        Introduction
    </ArticleSection>
    <ArticleSection title="Conclusion" id="conclusion">
        Introduction
    </ArticleSection>
    <References citations={citations}/>
</ArticleTemplate>

<style>
    .img-300 {
        width: 300px;
        max-width: 100%;
    }

    .img-600 {
        width: 600px;
        max-width: 100%;
    }

    .image-container {
        display: flex; 
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 100%;
    }
</style>