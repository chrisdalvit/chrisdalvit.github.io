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
        },
        sgmWiki: {
            index: 5,
            title: "Semi-global matching",
            author: "Wikipedia",
            year: "2025 (Accessed 28.04.2025)",
            link: "https://en.wikipedia.org/wiki/Semi-global_matching"
        },
        sgmNumpy: {
            index: 6,
            title: "Semi-Global Matching Numpy",
            author: "Christian Orr",
            year: "2025 (Accessed 28.04.2025)",
            link: "https://github.com/ChristianOrr/semi-global-matching-numpy?tab=readme-ov-file"
        },
        sgm: {
            index: 7,
            title: "Semi-Global Matching",
            author: "David-Alexandre Beaupre",
            year: "2025 (Accessed 28.04.2025)",
            link: "https://github.com/beaupreda/semi-global-matching"
        },
        sgmReddit: {
            index: 8,
            title: "Reddit",
            author: "Tr0xyzz1s",
            year: "2025 (Accessed 28.04.2025)",
            link: "https://www.reddit.com/r/computervision/comments/9119qc/can_i_have_a_pseudo_code_explanation_of_the/"
        },
        census: {
            index: 9,
            title: "Non-parametric local transforms for computing visual correspondence",
            author: "Ramin Zabih and John Woodfill",
            year: "1994",
            link: "https://www.cs.cornell.edu/~rdz/Papers/ZW-ECCV94.pdf"
        },
        zbontar: {
            index: 10,
            title: "Stereo Matching by Training a Convolutional Neural Network to Compare Image Patches",
            author: "Jure Žbontar and Yann LeCun",
            year: "2015",
            link: "https://arxiv.org/abs/1510.05970"
        },
        scharstein2003: {
            index: 11,
            title: "High-accuracy stereo depth maps using structured light",
            author: "Daniel Scharstein and Richard Szeliski",
            year: "2003",
            link: "https://www.cs.middlebury.edu/~schar/papers/structlight/structlight.pdf"
        },
        scharstein2007: {
            index: 12,
            title: "Learning conditional random fields for stereo",
            author: "Daniel Scharstein and Chris Pal",
            year: "2007",
            link: "https://www.cs.middlebury.edu/~schar/papers/LearnCRFstereo_cvpr07.pdf"
        },
        hirschmuellerEvaluation: {
            index: 13,
            title: "Evaluation of cost functions for stereo matching",
            author: "Heiko Hirschmuller and Daniel Scharstein",
            year: "2007",
            link: "https://www.cs.middlebury.edu/~schar/papers/evalCosts_cvpr07.pdf"
        }
    }
</script>

<ArticleTemplate title="Stereo Reconstruction from Scratch" date="06. May 2025">
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
    <ArticleSection title="Block Matching Implementation" id="block-matching-implementation">
        <p>
            Block matching is one of the simplest local stereo matching approaches. In this project, block matching is implemented by moving a window along the corresponding horizontal line in the right image <Katex>I_1</Katex> for every pixel <Katex>(u,v)</Katex> in the left image <Katex>I_0</Katex>. For every offset <Katex>d \in {"{ \\{0,\\dots,D \\}}"}</Katex>, the cost <Katex>C(u,v,d)</Katex> is computed, where <Katex>D</Katex> is the fixed maximum disparity. In the implementation, the average sum of squared differences is used as the matching cost function
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
    <ArticleSection title="Semi-Global Matching Implementation" id="semi-global-matching-implementation">
        <p>
            The Semi-Global Matching (SGM) algorithm presented by Hirschmüller <Citation citation={citations.hirschmuller} /> is based on the idea of pixel-wise matching and approximating a global 2D smoothness constraint by combining many 1D constraints <Citation citation={citations.hirschmuller} />. The implementation of the Semi-Global Matching algorithm in this project is inspired by <Citation citation={citations.hirschmuller} />, but it is not identical.
            Some of the resources I used for my implementation and may be helpful for understanding the algorithm are <Citation citation={citations.sgmWiki} />, <Citation citation={citations.sgmNumpy} />, <Citation citation={citations.sgm} /> and <Citation citation={citations.sgmReddit} />. The distinct processing steps of the implementation are discussed in the following paragraphs.
        </p>
        <p>
            Instead of matching pixels by their grayscale values, the <i>census transform</i> <Citation citation={citations.census} /> is applied to the left and right images. The census transform computes a bit string for each pixel, which is then used for matching. The census transform generates a bit string based on the relative intensities of the neighboring pixels. If the intensity of a neighboring pixel is less than that of the center pixel, a 1 is added to the bit string; otherwise, a 0 is added. This operation is repeated for all neighboring pixels to create the bit string. The ordering of the bits in the string contains enough information to perform an accurate and fast correspondence operation. The census transform computation is implemented by iterating over the image and calculating the census transform for each pixel. The bit string is stored as an integer.
        </p>
        <figure>
            <div class="image-container">
                <img class="img-450" src="stereo-reconstruction/census.png" alt="Census transform example."/>
            </div>
            <figcaption>
                Example of the census transform.
            </figcaption>
        </figure>
        <p>
            After applying the census transform to the left and right images, the <i>Hamming distance</i> is used to compute the cost. The Hamming distance compares two bit strings and counts the number of differing bits (e.g., 101 and 110 have a Hamming distance of 2 since they differ in two bits). The computation of the cost <Katex>C(u,v,d)</Katex> for the pixel <Katex>(u,v)</Katex> and disparity <Katex>d \in {"\\{1, \\dots, D \\}"}</Katex> can be implemented as follows
        </p>
        <Katex displayMode>
            C(u, v, d) = CT_0 (u,v) \oplus CT_1 (u-d,v)
        </Katex>
        <p>
            Where <Katex>\oplus</Katex> denotes the logical XOR operation, <Katex>CT_0</Katex> and <Katex>CT_1</Katex> are the census-transformed images, and the summation is performed over the bit string. The cost computation step can be implemented by iterating over <Katex>d \in {"\\{1, \\dots, D \\}"}</Katex>, shifting the right image <Katex>CT_1</Katex> by <Katex>d</Katex> pixels, and computing <Katex>C(u, v, d)</Katex> pixel-wise. The NumPy library can be leveraged to perform this computation efficiently. All costs are collected in a cost volume with dimensions <Katex>\mathbb{"{N}"}^{"{H \\times W \\times D}"}</Katex> , where <Katex>H</Katex> and <Katex>W</Katex> are the image dimensions, and <Katex>D</Katex> is the maximal disparity.
        </p>
        <p>
            Pixelwise cost calculation is generally ambiguous and noisy. As mentioned in the <a href="#theory">theory section</a>, minimizing the energy in 2D is NP-hard <Citation citation={citations.szeliski} />. Therefore, Hirschmüller proposes to minimize the energy in 1D for different directions <Katex>r</Katex> and aggregate the costs. This acts as an additional constraint that supports smoothness by penalizing changes in neighboring disparities <Citation citation={citations.hirschmuller} />. This results in a smoother cost volume and hence a smoother disparity map. The path cost <Katex>L_r (p, d)</Katex> for a pixel <Katex>p</Katex> and direction <Katex>r</Katex> is computed by the following expression
        </p>
        <Katex displayMode>
            L_r (p, d) = C(p,d) - \underset{"{k}"}{"\\min"} ~ L_r(p-r,k) + \min\begin{"{cases}"}
            L_r(p-r,d) \\
            L_r(p-r, d-1) + P_1 \\
            L_r(p-r, d+1) + P_1 \\
            \underset{"{i}"}{"{\\min}"} ~ L_r(p-r,i) + P_2
        \end{"{cases}"}
        </Katex>
        <p>
            The second term is used to prevent <Katex>L_r(p,d)</Katex> from permanently increasing along the path <Citation citation={citations.hirschmuller} />. <Katex>P_1</Katex> and <Katex>P_2</Katex> are constant penalties, where <Katex>P_1</Katex> penalizes small disparity changes and <Katex>P_2</Katex> penalizes larger disparity changes <Citation citation={citations.hirschmuller} />. Using a lower penalty for small changes permits adaptation to slanted or curved surfaces <Citation citation={citations.hirschmuller} />. In the project implementation, the penalties are set to <Katex>P_1 = 10</Katex> and <Katex>P_2 = 120</Katex>. The costs <Katex>L_r</Katex> are summed over paths in all directions <Katex>r</Katex> to obtain the aggregated (smoothed) cost
        </p>
        <Katex displayMode>
            S(p,d) = \sum_r L_r(p,d)
        </Katex>
        <p>
            Although Hirschmüller recommends using 8 to 16 paths <Citation citation={citations.hirschmuller} />, Žbontar and LeCun state that they gained no accuracy improvement from using more than 4 paths <Citation citation={citations.zbontar} />. Therefore, the SGM algorithm implemented in this project uses 4 paths (i.e., north, south, east, west directions). Note that the smoothed costs form a cost volume <Katex>S \in \mathbb{"{N}"}^{"{H \\times W \\times D}"}</Katex>. By selecting 
        </p>
        <Katex displayMode>
            d^* = \underset{"{d}"}{"{\\text{argmin}}"} ~ S(p,d)
        </Katex>
        <p>
            for every pixel <Katex>p</Katex>, the final disparity map can be extracted from the cost volume. Now lets take a look at the code. The code for computing the census transform is straightforward 
        </p>
        <Highlight language={python} code={
`def census_transform(self, img):
    height, width = img.shape
    census_values = np.zeros_like(img, dtype=np.int32)
    for y in range(self.kernel_half, height - self.kernel_half):
        for x in range(self.kernel_half, width - self.kernel_half):
            patch = self._get_patch(y, x, img)
            # If value is less than center value assign 1 otherwise assign 0 
            census_pixel_array = (patch.flatten() > img[y, x]).astype(int)
            # Convert census array to an integer by using bit shift operator
            census_values[y, x] = np.int32(census_pixel_array.dot(1 << np.arange(self.kernel_size * self.kernel_size)[::-1])) 
    return census_values
`
        }/>
    <p>
        Here the <code>_get_patch</code> method extracts the patch around the pixel <code>(y,x)</code>. Next the transformed images are used to compute the matching cost using the Hamming distance 
    </p>
    <Highlight language={python} code={
`def compute_costs(self, left_census_values, right_census_values):
    height, width = left_census_values.shape
    cost_volume = np.zeros(shape=(height, width, self.max_disparity), dtype=np.uint32)
    census_tmp = np.zeros_like(left_census_values, dtype=np.int32)

    for d in range(self.max_disparity):
        # The right image is shifted d pixels accross
        census_tmp[:, self.kernel_half+d:width-self.kernel_half] = right_census_values[:, self.kernel_half:width-d-self.kernel_half]
        # 1 is assigned when the bits differ and 0 when they are the same
        xor = np.bitwise_xor(left_census_values, census_tmp)
        # All the 1's are summed up to give us the number of different pixels (the cost)
        distance = np.bitwise_count(xor)
        # All the costs for that disparity are added to the cost volume
        cost_volume[:, :, d] = distance
    return cost_volume
`
    }/>
    <p>
        First the cost volume and the temporary census image are initialized. Then, for every disparity <code>d</code>, the right image is shifted <code>d</code> pixels to the left. The Hamming distance is computed by applying the XOR operation on the two census images. The number of differing bits is then summed up and stored in the cost volume.
    </p>
    <Highlight language={python} code={
`def _get_path_cost(self, slice, offset, penalties, other_dim):
    """Compute the minimum cost path for a single direction"""
    minimum_cost_path = np.zeros(shape=(other_dim, self.max_disparity), dtype=np.int32)
    minimum_cost_path[offset - 1, :] = slice[offset - 1, :]

    for pixel_index in range(offset, other_dim):
        # Get all the minimum disparities costs from the previous pixel in the path
        previous_cost = minimum_cost_path[pixel_index - 1, :]
        # Get all the disparities costs (from the cost volume) for the current pixel
        current_cost = slice[pixel_index, :]
        costs = np.repeat(previous_cost, repeats=self.max_disparity, axis=0).reshape(self.max_disparity, self.max_disparity)
        # Add penalties to the previous pixels disparities that differ from current pixels disparities
        costs = costs + penalties
        # Find minimum costs for the current pixels disparities using the previous disparities costs + penalties 
        costs = np.amin(costs, axis=0)  
        # Current pixels disparities costs + minimum previous pixel disparities costs (with penalty) - 
        # (constant term) minimum previous cost from all disparities 
        pixel_direction_costs = current_cost + costs - np.amin(previous_cost)
        minimum_cost_path[pixel_index, :] = pixel_direction_costs

    return minimum_cost_path 

def _aggregate_costs(self, cost_volume):
    """Aggregate costs in all directions"""
    height, width, _ = cost_volume.shape
    p2 = np.full(shape=(self.max_disparity, self.max_disparity), fill_value=self.penalty2, dtype=np.int32)
    p1 = np.full(shape=(self.max_disparity, self.max_disparity), fill_value=self.penalty1 - self.penalty2, dtype=np.int32)
    p1 = np.tril(p1, k=1) 
    p1 = np.triu(p1, k=-1)
    no_penalty = np.identity(self.max_disparity, dtype=np.int32) * -self.penalty1
    penalties = p1 + p2 + no_penalty

    south_aggregation = np.zeros(shape=(height, width, self.max_disparity), dtype=np.float32)
    north_aggregation = np.copy(south_aggregation)

    for x in range(self.kernel_half, width-self.kernel_half):
        # Takes all the rows and disparities for a single column
        south = cost_volume[:, x, :]
        # Invert the rows to get the opposite direction
        north = np.flip(south, axis=0)
        south_aggregation[:, x, :] = self._get_path_cost(south, 1, penalties, height)
        north_aggregation[:, x, :] = np.flip(self._get_path_cost(north, 1, penalties, height), axis=0)

    east_aggregation = np.copy(south_aggregation)
    west_aggregation = np.copy(south_aggregation)
    for y in range(self.kernel_half, height-self.kernel_half):
        # Takes all the column and disparities for a single row
        east = cost_volume[y, :, :]
        # Invert the columns to get the opposite direction
        west = np.flip(east, axis=0)
        east_aggregation[y, :, :] = self._get_path_cost(east, 1, penalties, width)
        west_aggregation[y, :, :] = np.flip(self._get_path_cost(west, 1, penalties, width), axis=0)

    # Combine the costs from all paths into a single aggregation volume
    aggregation_volume = np.concatenate((south_aggregation[..., None], north_aggregation[..., None], east_aggregation[..., None], west_aggregation[..., None]), axis=3)
    return aggregation_volume
`
    }/>
    <p>
        The <code>_aggregate_costs</code> method takes this cost volume and initializes the penalties. Next, two additional volumes are created to store the aggregated costs for the south and north directions. The <code>_get_path_cost</code> method is called for every pixel in the column. The same is done for the east and west directions. Finally, all four volumes are concatenated to form the final cost volume.
    </p>
    <Highlight language={python} code={
`def _select_disparity(self, aggregation_volume):
    # sum up costs for all directions
    volume = np.sum(aggregation_volume, axis=3).astype(float)
    # returns the disparity index with the minimum cost associated with each h x w pixel
    disparity = np.argmin(volume, axis=2).astype(float)
    return disparity
`
    }/>
    <p>
        Finally, the aggregated costs are summed up and the disparity with the lowest cost is selected.
    </p>
    <Highlight language={python} code={
`def compute(self, left, right):
    left_census = self._census_transform(left)
    right_census = self._census_transform(right)
    cost_volume = self._compute_costs(left_census, right_census)
    aggregation_volume = self._aggregate_costs(cost_volume)
    disparity = self._select_disparity(aggregation_volume)
    return disparity
`
    }/>
    <p>
        All pieces are put together in the <code>compute</code> method. In the implementation on GitHub additional scaling of the disparity between 0 and 255 is applied for visualization purposes. Here, the scaling is obmitted for simplicity.
    </p>
    </ArticleSection>
    <ArticleSection title="Sub-Pixel Estimation" id="sub-pixel-estimation">
        <p>
            So far, all algorithms computed a discrete disparity value <Katex>d \in {"\\{ 1 \\dots D \\}"}</Katex> <Citation citation={citations.szeliski} />. When reconstructing the point cloud from the disparity map, this results in discrete levels of the disparity map. Since this does not correspond to a realistic reconstruction of the scene, sub-pixel estimation can be used to obtain a more continuous scene reconstruction. Sub-pixel estimation uses the costs of the two neighboring disparities <Katex>C(d^*-1)</Katex> and <Katex>C(d^*+1)</Katex> of the optimal disparity <Katex>d^*</Katex> to compute the minimum of the parabola interpolated through the three points
        </p>
        <Katex displayMode>
            d^*_{"{\\text{ref}}"} = d^* + \frac{"{C(d^*-1) - C(d^*+1)}"}{"{2C(d^*-1) - 4C(d^*) + 2C(d^*+1)}"}
        </Katex>
        <p>
            The refined disparity <Katex>d^*_{"{\\text{ref}}"}</Katex> is then stored in the final disparity map. In the project implementation, sub-pixel estimation can be activated for both algorithms with a command-line argument. 
        </p>
        <figure>
            <div class="image-container">
                <img class="img-450" src="stereo-reconstruction/subpixel.svg" alt="Visualization of subpixel estimation."/>
            </div>
            <figcaption>
                Visualization of subpixel estimation.
            </figcaption>
        </figure>
    </ArticleSection>
    <ArticleSection title="Results" id="results">
        <p>
            Now it's time to take a look at the results. The implemented algorithms have been evaluated on two selected scenes from the Middlebury stereo dataset collection <Citation citation={citations.scharstein2003} />, <Citation citation={citations.scharstein2007} />, <Citation citation={citations.hirschmuellerEvaluation} />. All images have dimensions of <Katex>450 \times 375</Katex> pixels. The following image shows the computed disparity maps of the implemented methods without sub-pixel estimation. The OpenCV disparity map is included for reference.
        </p>
        <figure>
            <div class="image-container">
                <img class="img-600" src="stereo-reconstruction/method_comparison.png" alt="Comparision of the different algorithms."/>
            </div>
            <figcaption>
                <i>Left:</i> Block matching algorithm without sub-pixel estimation. <i>Middle:</i> SGM algorithm without sub-pixel estimation. <i>Right:</i> OpenCV Block matching implementation.
            </figcaption>
        </figure>
        <p>
            The SGM algorithm produces a smoother disparity map, with fewer holes (deep blue patches in the disparity map). However, the smoothing in the SGM algorithm also removes some details in the background (e.g., in the top right corner). The OpenCV algorithm performs an additional left-right consistency check by computing disparity maps for both the left and right images. This allows the OpenCV algorithm to mark occluded pixels as invalid (i.e., assigning them a disparity of zero). Both implemented algorithms do not use a left-right consistency check, and therefore, occluded pixels are assigned a disparity. The following image demonstrates that the activation of sub-pixel estimation produces a smoother disparity map
        </p>
        <figure>
            <div class="image-container">
                <img class="img-450" src="stereo-reconstruction/subpixel_comparison.png" alt="Comparision of disparity maps with subpixel estimation and without subpixel estimation."/>
            </div>
            <figcaption>
                <i>Left:</i> Disparity map from the SGM algorithm without sub-pixel estimation. <i>Right:</i> Disparity map from the SGM algorithm with sub-pixel estimation.
            </figcaption>
        </figure>
        <p>
            The effects of sub-pixel estimation on the reconstructed point cloud can be observed in the following image
        </p>
        <figure>
            <div class="image-container">
                <img class="img-450" src="stereo-reconstruction/subpixel_levels.png" alt="Comparision of reconstructed point clouds with subpixel estimation and without subpixel estimation."/>
            </div>
            <figcaption>
                <i>Left:</i> Point cloud reconstruction without sub-pixel estimation. The point cloud has clearly visible levels, caused by the discrete integer values in the disparity map. <i>Right:</i> Point cloud reconstruction with sub-pixel estimation. The point cloud is smooth, and objects like the mask appear as a continuous surface.
            </figcaption>
        </figure>
        <p>
            Especially for the mask and the rounded cones, sub-pixel estimation produces more realistic reconstructions of the scene compared to disparity maps without sub-pixel estimation. Apart from a qualitative evaluation, quantitative metrics can be computed as the Middlebury stereo datasets provide ground truths <Citation citation={citations.scharstein2003} />, <Citation citation={citations.scharstein2007} />, <Citation citation={citations.hirschmuellerEvaluation} />. The percentage of bad pixels (PBP) for different algorithms and images. PBP reports the percentage of pixels where the difference between estimated and true disparity is greater than a given threshold <Katex>\tau</Katex>
        </p>
        <Katex displayMode>
            \text{"{PBP}"} = \frac{"{\\sum_{i} \\mathbb{I} \\left( |d_i - d^*_i| > \\tau \\right)}"}{"{H \\times W}"} \times 100
        </Katex>
        <p>
            The next table reports the PBP for the slected scences and the implemented algorithms. The threshold <Katex>\tau</Katex> is set to 3 pixel.
        </p>
        <div class="table-container">
            <table>
                <tr>
                    <th></th>
                    <th>Cones</th>
                    <th>Teddy</th>
                </tr>
                <tr>
                    <td>Block Matching</td>
                    <td>34.31</td>
                    <td>39.36</td>
                </tr>
                <tr>
                    <td>&emsp;+ Sub-Pixel</td>
                    <td>32.46</td>
                    <td>37.38</td>
                </tr>
                <tr>
                    <td>SGM</td>
                    <td>34.29</td>
                    <td>40.3</td>
                </tr>
                <tr>
                    <td>&emsp;+ Sub-Pixel</td>
                    <td>32.81</td>
                    <td>38.33</td>
                </tr>
                <tr>
                    <td>OpenCV</td>
                    <td>31.09</td>
                    <td>36.34</td>
                </tr>
                <caption>Percentage of Bad Pixels of different algorithms</caption>
            </table>
        </div>
        <p>
            According to this table, block matching with sub-pixel estimation produces the best results on the two tested image pairs. Nonetheless, it is important to note that the evaluation of the different algorithms during this project is by far not exhaustive. A larger dataset and a more systematic evaluation of the disparity map quality are needed to make justified claims about the algorithm's performance. Overall, the generated point clouds appear to be a reasonable reconstruction of the scene. Visually, the SGM algorithm with sub-pixel estimation seems to produce the best results with only a few outliers.
        </p>
        <figure>
            <div class="image-container">
                <img class="img-450" src="stereo-reconstruction/final_result.png" alt="Final results of the reconstruction."/>
            </div>
            <figcaption>
                <i>Left:</i> Reconstructed point cloud using the block matching algorithm. Outliers in the point cloud are clearly visible. <i>Right:</i> Reconstructed point cloud using the SGM algorithm. The SGM point cloud has significantly fewer outliers.
            </figcaption>
        </figure>
    </ArticleSection>
    <ArticleSection title="Future Work" id="future-work">
        <p>
            Future work can be pursued in various directions. Additional algorithms could be implemented, and neural network approaches could be integrated into the project. A broader benchmarking of the algorithm's performance would be beneficial, especially for challenging scenes. Furthermore, optimizations such as left-right consistency checks could be implemented to improve the handling of occluded image regions. Lastly, further improvements in processing time could be achieved by leveraging different hardware capabilities such as vectorization or GPU computing. On the software side, optimizations such as computing the integral image for cost computation could lead to improved processing times.
        </p>
    </ArticleSection>
    <References citations={citations}/>
</ArticleTemplate>

<style>
    .img-300 {
        width: 300px;
        max-width: 100%;
    }

    .img-450 {
        width: 450px;
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

    .table-container {
        display: flex;
        justify-content: center;
        max-width: 700px;
        overflow-x:auto
    }

    table {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        border-collapse: collapse;
        width: 400px;
    }

    th {
        padding: 8px;
        text-align: start;
        background-color: rgb(208, 208, 208);
    }

    td {
        padding: 8px;
        border-top: solid;
        border-width: 1px;
        border-color: rgb(208, 208, 208);
    }
</style>