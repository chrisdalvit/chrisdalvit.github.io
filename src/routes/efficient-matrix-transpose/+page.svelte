<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import Highlight from "svelte-highlight";
    import c from "svelte-highlight/languages/c";
    import "svelte-highlight/styles/github-dark-dimmed.css";

    import ArticleTemplate from "$lib/ArticleTemplate.svelte";
    import ArticleSection from "$lib/ArticleSection.svelte";
    import Katex from 'svelte-katex';
    import ArticleAbstract from "$lib/ArticleAbstract.svelte";
    import Citation from "$lib/Citation.svelte";
    import References from "$lib/References.svelte";
    import chartsData from "./charts_data.json";


    const citations = {
        chacheEfficient: {
            index: 1, 
            author: "Siddhartha Chatterjee et al.", 
            title: "Cache-efficient matrix transposition", 
            year: "2000", 
            link: "https://www.cse.iitd.ac.in/~ssen/conf/hpca.pdf"
        },
        gccDocs: {
            index: 2, 
            author: "GCC Team", 
            title: "GCC Documentation", 
            year: "2023 (Accessed 27.04.2024)", 
            link: "https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html"
        },
        algoritmica: {
            index: 3,
            author: "Sergey Slotin",
            title: "Algorithmica",
            year: "2022 (Accessed 27.04.2024)",
            link: "https://en.algorithmica.org/hpc/external-memory/oblivious/",
        },
        valgrind: {
            index: 4,
            author: "Valgrind Developers",
            title: "Valgrind",
            year: "2022 (Accessed 27.04.2024)",
            link: "https://valgrind.org/",
        },
        valgrindDocs: {
            index: 5,
            author: "Valgrind Developers",
            title: "Valgrind Documentation",
            year: "2022 (Accessed 27.04.2024)",
            link: "https://valgrind.org/docs/manual/dist.news.html"
        },
        valgrindBug: {
            index: 6,
            title: "Valgrind for macOS",
            author: "Louis Brunner",
            year: "2024 (Accessed 27.04.2024)",
            link: "https://github.com/LouisBrunner/valgrind-macos/issues/56#issuecomment-1971933471",
        }
    }

    let labels = [8, 9, 10, 11, 12, 13, 14];
    let ctx_time_macbook_naive;
    let ctx_time_macbook_prefetch;
    let ctx_time_macbook_oblivious;
    let ctx_time_imac_naive;
    let ctx_time_imac_prefetch;
    let ctx_time_imac_oblivious;
    let canvas_time_macbook_naive: any;
    let canvas_time_macbook_prefetch: any;
    let canvas_time_macbook_oblivious: any;
    let canvas_time_imac_naive: any;
    let canvas_time_imac_prefetch: any;
    let canvas_time_imac_oblivious: any;

    let ctx_bandwidth_macbook_naive;
    let ctx_bandwidth_macbook_prefetch;
    let ctx_bandwidth_macbook_oblivious;
    let ctx_bandwidth_imac_naive;
    let ctx_bandwidth_imac_prefetch;
    let ctx_bandwidth_imac_oblivious;
    let canvas_bandwidth_macbook_naive: any;
    let canvas_bandwidth_macbook_prefetch: any;
    let canvas_bandwidth_macbook_oblivious: any;
    let canvas_bandwidth_imac_naive: any;
    let canvas_bandwidth_imac_prefetch: any;
    let canvas_bandwidth_imac_oblivious: any;

    function build_time_chart(title: string, ctx: any, o0: number[], o1:  number[], o2: number[], o3: number[], displayYAxisLabel = false) {
        return new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [
                    { label: '-O0', data: o0 },
                    { label: '-O1', data: o1 },
                    { label: '-O2', data: o2 },
                    { label: '-O3', data: o3 },
                ]
            },
            options: {
                scales: {
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: displayYAxisLabel,
                            text: "Time (s)"
                        },
                        min: 0,
                        suggestedMax: 5,
                        ticks: {
                            callback: function (value, index, tick) {
                                return Number(value.toString());//pass tick values as a string into Number function
                            }
                        },
                        afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                            chartObj.ticks = [];
                            chartObj.ticks.push({value: 1});
                            chartObj.ticks.push({value: 0.01});
                            chartObj.ticks.push({value: 0.0001});
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 10
                        }
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
        });
    }

    function build_bandwidth_chart(title: string, ctx: any, o0: number[], o1:  number[], o2: number[], o3: number[], displayYAxisLabel = false) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: '-O0', data: o0 , borderWidth: 1},
                    { label: '-O1', data: o1 , borderWidth: 1},
                    { label: '-O2', data: o2 , borderWidth: 1},
                    { label: '-O3', data: o3 , borderWidth: 1},
                ]
            },
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        title: {
                            display: displayYAxisLabel,
                            text: "Bandwidth (GB/s)"
                        },
                        min: 0,
                        max: 25,
                        ticks: {
                            callback: function (value, index, tick) {
                                return Number(value.toString());//pass tick values as a string into Number function
                            }
                        },
                        afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                            chartObj.ticks = [];
                            chartObj.ticks.push({value: 1});
                            chartObj.ticks.push({value: 5});
                            chartObj.ticks.push({value: 10});
                            chartObj.ticks.push({value: 15});
                            chartObj.ticks.push({value: 25});
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 10
                        }
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
        });
    }

    onMount(() => {
        ctx_time_macbook_naive = canvas_time_macbook_naive.getContext('2d');
        ctx_time_macbook_prefetch = canvas_time_macbook_prefetch.getContext('2d');
        ctx_time_macbook_oblivious = canvas_time_macbook_oblivious.getContext('2d');
        ctx_time_imac_naive = canvas_time_imac_naive.getContext('2d');
        ctx_time_imac_prefetch = canvas_time_imac_prefetch.getContext('2d');
        ctx_time_imac_oblivious = canvas_time_imac_oblivious.getContext('2d');

        ctx_bandwidth_macbook_naive = canvas_bandwidth_macbook_naive.getContext('2d');
        ctx_bandwidth_macbook_prefetch = canvas_bandwidth_macbook_prefetch.getContext('2d');
        ctx_bandwidth_macbook_oblivious = canvas_bandwidth_macbook_oblivious.getContext('2d');
        ctx_bandwidth_imac_naive = canvas_bandwidth_imac_naive.getContext('2d');
        ctx_bandwidth_imac_prefetch = canvas_bandwidth_imac_prefetch.getContext('2d');
        ctx_bandwidth_imac_oblivious = canvas_bandwidth_imac_oblivious.getContext('2d');

        // Time scatter charts
        build_time_chart('Naive (Macbook)', ctx_time_macbook_naive, chartsData.time_macbook_naive.o0, chartsData.time_macbook_naive.o1, chartsData.time_macbook_naive.o2, chartsData.time_macbook_naive.o3, true)
        build_time_chart('Prefetch (Macbook)', ctx_time_macbook_prefetch, chartsData.time_macbook_prefetch.o0, chartsData.time_macbook_prefetch.o1, chartsData.time_macbook_prefetch.o2, chartsData.time_macbook_prefetch.o3)
        build_time_chart('Oblivious (Macbook)', ctx_time_macbook_oblivious, chartsData.time_macbook_oblivious.o0, chartsData.time_macbook_oblivious.o1, chartsData.time_macbook_oblivious.o2, chartsData.time_macbook_oblivious.o3)
        build_time_chart('Naive (iMac)', ctx_time_imac_naive, chartsData.time_imac_naive.o0, chartsData.time_imac_naive.o1, chartsData.time_imac_naive.o2, chartsData.time_imac_naive.o3, true)
        build_time_chart('Prefetch (iMac)', ctx_time_imac_prefetch, chartsData.time_imac_prefetch.o0, chartsData.time_imac_prefetch.o1, chartsData.time_imac_prefetch.o2, chartsData.time_imac_prefetch.o3)
        build_time_chart('Oblivious (iMac)', ctx_time_imac_oblivious, chartsData.time_imac_oblivious.o0, chartsData.time_imac_oblivious.o1, chartsData.time_imac_oblivious.o2, chartsData.time_imac_oblivious.o3)

        // Bandwidth charts
        build_bandwidth_chart('Naive (Macbook)', ctx_bandwidth_macbook_naive, chartsData.bandwidth_macbook_naive.o0, chartsData.bandwidth_macbook_naive.o1, chartsData.bandwidth_macbook_naive.o2, chartsData.bandwidth_macbook_naive.o3, true)
        build_bandwidth_chart('Prefetch (Macbook)', ctx_bandwidth_macbook_prefetch, chartsData.bandwidth_macbook_prefetch.o0, chartsData.bandwidth_macbook_prefetch.o1, chartsData.bandwidth_macbook_prefetch.o2, chartsData.bandwidth_macbook_prefetch.o3)
        build_bandwidth_chart('Oblivious (Macbook)', ctx_bandwidth_macbook_oblivious, chartsData.bandwidth_macbook_oblivious.o0, chartsData.bandwidth_macbook_oblivious.o1, chartsData.bandwidth_macbook_oblivious.o2, chartsData.bandwidth_macbook_oblivious.o3)

        build_bandwidth_chart('Naive (iMac)', ctx_bandwidth_imac_naive, chartsData.bandwidth_imac_naive.o0, chartsData.bandwidth_imac_naive.o1, chartsData.bandwidth_imac_naive.o2, chartsData.bandwidth_imac_naive.o3, true)
        build_bandwidth_chart('Prefetch (iMac)', ctx_bandwidth_imac_prefetch, chartsData.bandwidth_imac_prefetch.o0, chartsData.bandwidth_imac_prefetch.o1, chartsData.bandwidth_imac_prefetch.o2, chartsData.bandwidth_imac_prefetch.o3)
        build_bandwidth_chart('Oblivious (iMac)', ctx_bandwidth_imac_oblivious, chartsData.bandwidth_imac_oblivious.o0, chartsData.bandwidth_imac_oblivious.o1, chartsData.bandwidth_imac_oblivious.o2, chartsData.bandwidth_imac_oblivious.o3)
    });
</script>

<ArticleTemplate title="Efficient Matrix Transpose" date="19. November 2024">
    <ArticleAbstract>
        In this blog post, we are going to implement and benchmark different in-place algorithms for transposing square matrices. The goal is to optimize the algorithms with respect to speed and throughput, taking into account cache behavior. First I describe the problem, then we look at the algorithm implementation and finally I present my benchmarking results. The complete project is available on <a href="https://github.com/chrisdalvit/efficient-matrix-transpose" target="_blank">GitHub</a>. In <a href="/gpu-matrix-transpose" target="_blank">another project</a> I parallelized matrix transpose algorithms for GPU's with CUDA. Feel free to check it out and contact me if you have any questions or comments.
    </ArticleAbstract>
    <ArticleSection title="The Problem" id="the-problem">
        <p>
            Before we dive into the algorithms, let me first recall a little bit of theory and describe why the implementation of matrix transpose is challenging. So mathematically speaking, if we have a matrix <Katex>A \in \mathbb{"{R}"}^{"{n \\times m}"}</Katex>, the transpose of the matrix <Katex>A^T \in \mathbb{"{R}"}^{"{m \\times n}"}</Katex> is defined as
        </p>
        <Katex displayMode>
            A^T_{"{ij}"} = A_{"{ji}"}
        </Katex>
        <p>
            So all entries are swapped along the matrix diagonal. For simplicity, I will assume that matrices have dimensions of <Katex>2^N</Katex> for <Katex>N \in \mathbb{"{N}"}</Katex>. As a result, the implemented algorithms don't need to accommodate changes in the output matrix's shape. I also assume that the matrices are stored and accessed in a row-major memory layout. All considered algorithms are in-place, so no new memory is allocated.
        </p>
        <p>
            While implementing an algorithm that computes the transpose of a matrix is straightforward, coming up with an efficient implementation is quite tricky. In general, leveraging spatial locality (accessing elements that are close by in memory) and temporal locality (accessing the same element throughout different time steps) can improve efficiency. Because each element of the matrix is accessed only once, temporal locality cannot be exploited for computing the transposed matrix <Citation citation={citations.chacheEfficient}/>, so spatial locality becomes the only source for improvement. The issue with leveraging spatial locality in matrix transposition is that data is accessed along rows but written along columns, potentially leading to poor cache performance. Algorithms that respect spatial locality in their memory access pattern can benefit from quicker access to cached data.
        </p>        
        <figure>
            <div class="image-container">
                <img src="efficient-matrix-transpose/cache_graphic.png" alt="Cache behavior graphic"/>
            </div>
            <figcaption>
                Data is accessed along rows. After accessing the second element, the first row (yellow part) is loaded into cache. For writing the second element, the second row needs to be loaded into cache. For writing the third element, the third row etc. Therefore, there is no exploitation of spatial locality.
            </figcaption>
        </figure>
    </ArticleSection>
    <ArticleSection title="Algorithms" id="algorithms">
        <p>
            Let's take a look at three different algorithms for in-place matrix transposition. The first implementation can be directly inferred from the mathematical definition 
        </p>
        <Highlight language={c} code={
`/*
    params:
        size: Size of matrix
        mat: Matrix to transpose
*/
void naive_transpose_int_matrix(int size, int* mat){
    for(int i = 0; i < size; i++){
        for(int j = i+1; j < size; j++){
            int tmp = mat[i*size+j];
            mat[i*size+j] = mat[j*size+i];
            mat[j*size+i] = tmp;
        }
    }
}
`}
        />
        <p>
            Transposition is performed by iterating over all entries above the matrix diagonal and swapping them with the corresponding entries below the diagonal. The first implementation will serve as the baseline implementation to measure performance improvements. The main issue with the naive implementation's memory access pattern is the disjointed access from <code>mat[j*size+i]</code>, potentially causing poor cache performance, especially with larger matrices where <code>mat[j*size+i]</code> might not be present in cache and requires loading from memory.
        </p>
        <p>
            The second implementation tries to improve performance by prefetching the memory addresses needed in the next iteration. This should reduce cache-miss latency by moving data into the cache before it is accessed <Citation citation={citations.gccDocs}/>.
        </p> 
        <Highlight language={c} code={
`/*
    params:
        size: Size of matrix
        mat: Matrix to transpose
*/
void prefetch_transpose_int_matrix(int size, int* mat){
    for(int i = 0; i < size; i++){
        for(int j = i+1; j < size; j++){
            int tmp = mat[i*size+j];
            mat[i*size+j] = mat[j*size+i];
            mat[j*size+i] = tmp;
            __builtin_prefetch(&mat[j*size+(i+1)], 0, 1);
            __builtin_prefetch(&mat[(i+1)*size+j], 1, 1);
        }
    }
}`}
        />
        <p>
            The built-in function <code>__builtin_prefetch</code> can be used to perform prefetching. <code>__builtin_prefetch</code> takes as arguments the address to be prefetched and two optional arguments <code>rw</code> and <code>locality</code>. Setting <code>rw</code> to 1 means preparing the prefetch for write access and setting <code>locality</code> to 1 means that the prefetched data has low temporal locality <Citation citation={citations.gccDocs}/>.
        </p>
        <p>
            The third algorithm implements a recursive pattern for matrix transposition. It uses the fact that 
        </p>
        <Katex displayMode>
            \begin{"{pmatrix}"}
            A & B \\
            C & D
            \end{"{pmatrix}"}^T = 
            \begin{"{pmatrix}"}
                A^T & C^T \\
                B^T & D^T
            \end{"{pmatrix}"}
        </Katex>
        <p>
            Where <Katex>A, B, C</Katex> and <Katex>D</Katex> are submatrices. Note that the submatrices <Katex>B</Katex> and <Katex>C</Katex> get swapped. The idea behind this algorithm is that it splits the matrix into four sub-matrices until the submatrices fit into the cache. Then the submatrices get transposed and the quadrants get swapped.  
        </p>
        <Highlight language={c} code={
`void transpose_block(int size, int *mat, int row_offset, int col_offset) {
    if (size <= 128) { // Base case, use a simple loop for small matrices
        for (int i = 0; i < size; ++i) {
            for (int j = i + 1; j < size; ++j) {
                int tmp = mat[(row_offset + i) * size + (col_offset + j)];
                mat[(row_offset + i) * size + (col_offset + j)] = mat[(row_offset + j) * size + (col_offset + i)];
                mat[(row_offset + j) * size + (col_offset + i)] = tmp;
            }
        }
    } else {
        int m = size / 2; // Divide the matrix into four quadrants

        // Transpose each quadrant recursively
        transpose_block(m, mat, row_offset, col_offset);
        transpose_block(m, mat, row_offset, col_offset + m);
        transpose_block(m, mat, row_offset + m, col_offset);
        transpose_block(m, mat, row_offset + m, col_offset + m);

        // Swap the quadrants to achieve in-place transposition
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < m; ++j) {
                int tmp = mat[(row_offset + i) * size + (col_offset + m + j)];
                mat[(row_offset + i) * size + (col_offset + m + j)] = mat[(row_offset + m + i) * size + (col_offset + j)];
                mat[(row_offset + m + i) * size + (col_offset + j)] = tmp;
            }
        }
    }
}

void transpose(int size, int *mat){
    transpose_block(size, mat, 0, 0);
}`}
        />
        <p>
            For a matrix size of 128 or smaller the algorithm performs a normal transpose operation. Otherwise, the matrix is split into four submatrices and the function is called recursively. After the transposition of the submatrices, the upper-right and bottom-left quadrants need to be swapped. This algorithm exploits spatial locality as it divides the matrix into sub-matrices that can fit into the cache. The third algorithm also has a reduced I/O complexity of <Katex>\mathcal{"{O}"}(\frac{"{N^2}"}{"{B}"})</Katex> <Citation citation={citations.algoritmica}/>, where <Katex>N</Katex> is the size of the matrix and <Katex>B</Katex> the size of the blocks (i.e. the size of matrices where standard transposition is performed). It then transposes each submatrix, which can be performed more efficiently as the whole submatrix is present in cache. This algorithm also works quite well for large matrices, because they are always reduced to submatrices of sizes that fit into cache. The threshold of 128 for performing standard matrix transposition, was selected because my MacBook Air has an L1 data cache of 65KB. Since each matrix element is an integer having a size of 4 bytes, a submatrix of dimension 128 needs 128*128*4 = 65536 bytes. Therefore, one submatrix fits in the L1 data cache, which should result in better performance. I tested the same algorithm for threshold values 32, 64, 128, 256 and 512. The results indicated that the algorithm performed best with a threshold of 128 on the tested architectures.
        </p>
    </ArticleSection>
    <ArticleSection title="Experiments" id="experiments">
        <p>
            Each algorithm was compiled with optimization levels <code>-O0</code>, <code>-O1</code>, <code>-O2</code>, <code>-O3</code>. Each resulting binary was evaluated 50 times for matrix sizes between <Katex>2^8</Katex> and <Katex>2^{"{14}"}</Katex>. Cache data was collected using Valgrind <Citation citation={citations.valgrind}/>. Each binary was benchmarked with the Cachegrind tool for matrix size <Katex>2^{"{14}"}</Katex>. The experiments were conducted on two different architectures
        </p>
        <ul>
            <li>MacBook Air (2020) having a M1 chip with 3,2 GHz and 8 cores, 8GB of RAM, 131KB L1 instruction cache, 65KB L1 data cache, 4.2 MB L2 cache and a cacheline size of 128 byte.</li>
            <li>iMac (2011) having a Intel Core i5 with 2.5GHz and 4 cores, 8GB of RAM, 64KB L1 cache, 1MB L2 cache, 6MB L3 cache and a cacheline size of 64 byte.</li>
        </ul>
        <p>
            Unfortunately Valgrind is not officially supported for ARM-based Apple computers <Citation citation={citations.valgrindDocs}/> and Open-Source projects working on compatibility for M1 processors are still in the experimental phase <Citation citation={citations.valgrindBug}/>. Therefore it is not possible to provide cache performance data for the MacBook Air experiments. Now let's take a look at the average execution time (on the x-axis is the <Katex>\log_2</Katex> of the matrix size)
        </p>
        <div class="chart-container">
            <canvas class="chart" bind:this={canvas_time_macbook_naive} />
            <canvas class="chart" bind:this={canvas_time_macbook_prefetch} />
            <canvas class="chart" bind:this={canvas_time_macbook_oblivious} />
            <canvas class="chart" bind:this={canvas_time_imac_naive} />
            <canvas class="chart" bind:this={canvas_time_imac_prefetch} />
            <canvas class="chart" bind:this={canvas_time_imac_oblivious} />
        </div>
        <p>
            The third algorithm achieved the highest speedup with optimization flags. It showed a speedup of 7.81 on the MacBook Air and 5.7 on the iMac when comparing non-optimized code to code with <code>-O3</code> enabled for matrix size <Katex>2^{"{14}"}</Katex>.
            On the MacBook Air, the third algorithm gained an additional speedup of 1.46 for matrix size <Katex>2^{"{14}"}</Katex> using <code>-O2</code> and <code>-O3</code> optimizations compared to <code>-O1</code> optimization.
            The second algorithm performs slightly better for large matrices with some optimization enabled, resulting in a speedup of 2.11 on the MacBook Air and 1.73 on the iMac for matrix size <Katex>2^{"{14}"}</Katex>.
            Enabling optimization flags can be disadvantageous for execution time performance (see <code>naive</code> and <code>naive_prefetch</code> implementations for matrix size <Katex>2^{"{10}"}</Katex>). Beside the execution time, I also computed the effective bandwidth
        </p>
        <Katex displayMode>
            B_{"{\\text{eff}}"} = \frac{"{2 \\cdot 4 \\cdot N^2}"}{"T"}
        </Katex>
        <p>
            Where <Katex>4 \cdot N^2</Katex> is the matrix size in bytes (assuming an integer is 4 bytes long). We multiply the matrix size in bytes by 2 because every matrix element is read and written. Finally, we divide by the execution time <Katex>T</Katex>. The effective bandwidth tells us how many bytes we move per execution time. Usually, a higher effective bandwidth is better. The following plots report the effective bandwidth of the different implementations
        </p>
        <div class="chart-container">
            <canvas class="chart" bind:this={canvas_bandwidth_macbook_naive} />
            <canvas class="chart" bind:this={canvas_bandwidth_macbook_prefetch} />
            <canvas class="chart" bind:this={canvas_bandwidth_macbook_oblivious} />
            <canvas class="chart" bind:this={canvas_bandwidth_imac_naive} />
            <canvas class="chart" bind:this={canvas_bandwidth_imac_prefetch} />
            <canvas class="chart" bind:this={canvas_bandwidth_imac_oblivious} />
        </div>
        <p>
            It's evident across all graphs that the effective bandwidth decreases as the matrix size increases. This trend arises because the matrix size grows exponentially with a base of 2, while the execution time grows exponentially with a base of roughly 10. Consequently, the execution time increases more rapidly than the matrix size, leading to a decline in effective bandwidth. Nevertheless, the third algorithm performs best when optimization is turned on, achieving significantly higher effective bandwidth. In some cases the third algorithm with optimizations achieves 9.95x higher bandwidth compared to the unoptimized version. The third performance metric I measured, was cache performance. In the following table you can see the summary output of the Cachegrind tool for the iMac
        </p>
        <div class="table-container">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Ir</th>
                    <th>Dr</th>
                    <th>DLmr</th>
                    <th>Dw</th>
                    <th>D1mw</th>
                    <th>DLmw</th>
                </tr>
                <tr>
                    <td>Naive</td>
                    <td>20.6</td>
                    <td>5.1</td>
                    <td>0.14</td>
                    <td>2.4</td>
                    <td>0.016</td>
                    <td>0.016</td>
                </tr>
                <tr>
                    <td>Oblivious</td>
                    <td>41.1</td>
                    <td>10.1</td>
                    <td>0.041</td>
                    <td>4.7</td>
                    <td>0.033</td>
                    <td>0.033</td>
                </tr>
                <caption>Cache metrics for iMac experiments (in billions)</caption>
            </table>
        </div>
        <p>
            The <code>naive</code> and <code>naive_prefetch</code> implementations show similar cache patterns (therefore <code>naive_prefetch</code> is omitted in the table), while the <code>oblivious128</code> implementation stands out with different cache behavior. Comparing cache data across implementations, it's evident that the <code>oblivious128</code> implementation requires approximately twice as many instructions (Ir), data reads (Dr), and data writes (Dw) as the <code>naive</code> implementation. The difference could be a result of the extra instructions required for transposing submatrices and copying quadrants in the <code>oblivious128</code> algorithm, leading to a greater overall instruction count. Another notable finding is that the last-level data cache read misses are significantly lower for the <code>oblivious128</code> implementation. This may be due to the improved fit of submatrices utilized in the <code>oblivious128</code> algorithm within the cache.
        </p>
    </ArticleSection>
    <ArticleSection title="Conclusion" id="conclusion">
        <p>
            After analyzing various algorithms and metrics, we saw that utilizing blocks can enhance the performance of matrix transposition algorithms. This was demonstrated through the better execution time and effective bandwidth of compiler-optimized versions of the <code>oblivious128</code> implementation. The third algorithm also presents promising directions for parallelization, as each submatrix can be processed independently, offering straightforward potential for parallel execution. If you are intrested in more, <a href="/gpu-matrix-transpose" target="_blank">here</a> I parallelized matrix transpose algorithms for GPU's with CUDA.
        </p>
    </ArticleSection>
    <References citations={citations}/>
</ArticleTemplate>

<style>
    .chart-container {
        display: flex; 
        justify-content: space-around; 
        flex-wrap: wrap
    }

    .chart {
        min-width: 200px; 
        max-width: 220px; 
        max-height: 220px;
    }

    caption {
        margin-bottom: 8px;
    }

    figcaption {
        display: flex;
        width: 100%;
    }

    .image-container {
        display: flex;
        justify-content: center;
    }

    img {
        width: 180px;
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
        max-width: 700px;
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