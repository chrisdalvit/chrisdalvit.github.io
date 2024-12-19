<script lang="ts">
    import { onMount } from "svelte";
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
    

    let citations = {
        cudaBestPractices: {
            index: 1,
            title: "CUDA C++ Best Practices Guide",
            author: "Nvidia",
            year: "2024 (Accessed 05.06.2024)",
            link: "https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/contents.html",
        },
        cudaMemApi: {
            index: 2,
            title: "CUDA Toolkit Documentation",
            author: "Nvidia",
            year: "2024 (Accessed 19.12.2024)",
            link: "https://docs.nvidia.com/cuda/cuda-runtime-api/group__CUDART__MEMORY.html"
        },
        cudaCppGuide: {
            index: 3,
            title: "CUDA C++ Programming Guide",
            author: "Nvidia",
            year: "2024 (Accessed 19.12.2024)",
            link: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html"
        }
    }

    let labels = [8, 9, 10, 11, 12, 13, 14];

    function build_time_chart(
        title: string, 
        ctx: any, 
        cpu: number[], 
        gpuNaive8:  number[], 
        gpuNaive16:  number[], 
        gpuTiled8:  number[], 
        gpuTiled16:  number[], 
        displayYAxisLabel = false
    ) {
        return new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [
                    { label: 'CPU Oblivious', data: cpu },
                    { label: 'GPU Naive 8', data: gpuNaive8 },
                    { label: 'GPU Naive 16', data: gpuNaive16 },
                    { label: 'GPU Tiled 8', data: gpuTiled8 },
                    { label: 'GPU Tiled 16', data: gpuTiled16 },
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

    function build_bandwidth_chart(
        title: string, 
        ctx: any, 
        cpu: number[], 
        gpuNaive8:  number[], 
        gpuNaive16: number[], 
        gpuTiled8: number[], 
        gpuTiled16: number[],
        displayYAxisLabel = false
    ) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'CPU Oblivious', data: cpu, borderWidth: 1},
                    { label: 'GPU Naive 8', data: gpuNaive8, borderWidth: 1 },
                    { label: 'GPU Naive 16', data: gpuNaive16, borderWidth: 1 },
                    { label: 'GPU Tiled 8', data: gpuTiled8, borderWidth: 1 },
                    { label: 'GPU Tiled 16', data: gpuTiled16, borderWidth: 1 },
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
                        max: 530,
                        ticks: {
                            callback: function (value, index, tick) {
                                return Number(value.toString());//pass tick values as a string into Number function
                            }
                        },
                        afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                            chartObj.ticks = [];
                            chartObj.ticks.push({value: 0});
                            chartObj.ticks.push({value: 250});
                            chartObj.ticks.push({value: 500});
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

    let ctx_gpu_time;
    let ctx_gpu_bandwidth;
    let canvas_gpu_time: any;
    let canvas_gpu_bandwidth: any;
    
    onMount(() => {
        ctx_gpu_time = canvas_gpu_time.getContext('2d');
        ctx_gpu_bandwidth = canvas_gpu_bandwidth.getContext('2d'); 
        build_time_chart('Mean execution time', ctx_gpu_time, chartsData.time_cpu, chartsData.time_gpu_naive_8, chartsData.time_gpu_naive_16, chartsData.time_gpu_tiled_8, chartsData.time_gpu_tiled_16, true)
        build_bandwidth_chart('Mean bandwidth', ctx_gpu_bandwidth, chartsData.bandwidth_cpu, chartsData.bandwidth_gpu_naive_8, chartsData.bandwidth_gpu_naive_16, chartsData.bandwidth_gpu_tiled_8, chartsData.bandwidth_gpu_tiled_16, true)
    })
</script>

<ArticleTemplate title="GPU Matrix Transpose" date="19. November 2024">
    <ArticleAbstract>
        In one of my <a href="/efficient-matrix-transpose" target="_blank">previous blog posts</a> I analyzed the performance of different matrix transpose algorithms on the CPU. In this blog post, we are going to implement and benchmark two matrix transpose algorithms on the Graphics Processing Unit (GPU) using CUDA. The goal is to optimize the algorithms with respect to speed and throughput. 
        First I describe the problem, then we look at the algorithm implementation and finally I present my benchmarking results. The complete project is available on <a href="https://github.com/chrisdalvit/gpu-matrix-transpose" target="_blank">GitHub</a>. Feel free to check it out and contact me if you have any questions or comments.
    </ArticleAbstract>
    <ArticleSection title="CUDA Fundamentals" id="cuda-fundamentals">
        <p>
            GPU's are great for parallelizing code and thus booting the performance. When performing matrix transposition, the different swaps of matrix elements are independent of each other. Therefore, matrix transpose algorithms could benefit from parallelization. Before I present the algorithms, let me first explain some CUDA fundamentals.
        </p>
        <p>
            In a typical CUDA program, you have some data where you want to perform parallelized computations. The first thing you need to do is to move this data from the host memory (usually your PC's memory) to the GPU memory. The CUDA API provides this functionality <Citation citation={citations.cudaMemApi}/>. When your data is on the GPU, you can launch a kernel to perform some kind of computation on the data. A kernel is a special type of function that is executed on the GPU. Typically, a kernel launches multiple threads that all execute the same logic, but usually on different parts of the data. In our case, the data is the matrix, and a kernel could launch multiple threads, each swapping one matrix element.
        </p>
        <p>
            The last important concept to understand the blog post is Nvidia's GPU memory hierarchy. Before, we mentioned that a kernel launch creates multiple threads. Actually, CUDA provides a way to group threads into thread blocks. When launching a kernel, we need to specify the size of a thread block and the total number of thread blocks. All thread blocks are collected in a grid. 
        </p>
        <div class="image-container">
            <img src="gpu-matrix-transpose/cuda_hierarchy.png" alt="CUDA memory hierarchy"/>
        </div>
        <p>
            Threads from the same thread block have access to a shared memory which is significantly faster to access then the GPU's global memory. Therefore, it is essential for good performance to group threads that access the same memory regions into the same thread block. Obviously, I cannot cover all compute capabilities of the CUDA API, but with this knowledge you should be able to understand the following blog post. If you are intrested a better introduction, take a look at Nvidia C++ Programming Guide <Citation citation={citations.cudaCppGuide}/>.
        </p>
    </ArticleSection>
    <ArticleSection title="Algorithms" id="algorithms">
        <p>
            The first kernel is a straightforward parallelization of the naive CPU algorithm from the <a href="/efficient-matrix-transpose#algorithms" target="_blank">previous blog posts</a>. Instead of performing the swap of matrix elements in nested loops, each thread swaps one matrix element. Because each swap can be performed independently, no synchronization between threads in needed. 
        </p>
        <Highlight language={c} code={
`/*
    params:
        size: Size of matrix
        mat: Matrix to transpose
*/
__global__
void transpose(int size, int* mat){
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < size && y < size && x < y) {
        int tmp = mat[y * size + x];
        mat[y * size + x] = mat[x * size + y];
        mat[x * size + y] = tmp;
    }
        
}`
        }/>
        <p>
            The first algorithm computes the coordinates of the thread in the grid, i.e., the indices that a thread should swap. Note that the implementation uses two-dimensional block and grid sizes, as they can naturally map to the two-dimensional structure of matrices. The conditions <Katex>x \le n</Katex> and <Katex>y \le n</Katex> ensure that no thread swaps indices that are outside the matrix. The condition <Katex>x \le y</Katex> ensures that no duplicate swaps occur, which would result in the original matrix instead of the transposed matrix. If all conditions are satisfied, a standard in-place transposition is performed by the kernel function. Block and grid dimensions are computed according to the matrix size to ensure that all matrix elements get swapped, i.e., enough threads are launched. The drawback of the Algorithm first algorithm is that every memory access in the kernel function is to the global GPU memory. An optimized kernel function could use the shared memory of the GPU, since it has higher bandwidth and lower latency <Citation citation={citations.cudaBestPractices}/>. These properties can be leveraged to improve the performance of the algorithm. This motivates the second CUDA kernel
        </p>
        <Highlight language={c} code={
`/*
    params:
        size: Size of matrix
        mat: Matrix to transpose
*/
__global__ void transpose(int size, int* matrix) {
    __shared__ int tile[TILE_DIM][TILE_DIM+1];

    int x = blockIdx.x * TILE_DIM + threadIdx.x;
    int y = blockIdx.y * TILE_DIM + threadIdx.y;

    for (int i = 0; i < TILE_DIM; i += blockDim.y) {
        if (x < size && y + i < size) {
            tile[threadIdx.y + i][threadIdx.x] = matrix[(y + i) * size + x];
        }
    }

    __syncthreads();

    for (int i = 0; i < TILE_DIM; i += blockDim.y) {
        if (x < size && y + i < size) {
            matrix[(y + i) * size + x] = tile[threadIdx.x][threadIdx.y + i];
        }
    }
}`
        }/>
        <p>
            In the second algorithm, each block transposes a tile of the matrix. The kernel function uses a two-dimensional array in the GPUs shared memory. In the first loop, data from the matrix tile is loaded from the global memory into the shared memory. After synchronization, the second loop writes the transposed data back from shared memory to global memory. Synchronizing all threads of the block is needed because the threads inside a block cannot operate independently. Calling <code>__syncthreads()</code> ensures that the whole array in shared memory has been populated with the corresponding matrix element. Only after synchronization, the threads can continue to write the data to global memory. Otherwise, threads might write data into global memory that has not been loaded yet. Note that the size of the shared memory tile is <code>TILE_DIM × TILE_DIM+1</code>. This size is selected in order to avoid memory bank conflicts. Shared memory bank conflicts occur if two threads want to access the same shared memory bank at the same time. This results in serialized access, where the requests are processed one after another instead of in parallel, reducing performance. By offsetting each row with padding, the memory accesses are spread across different banks, reducing the chances of bank conflicts during shared memory access. This should result in better performance.
        </p>
    </ArticleSection>
    <ArticleSection title="Experiments" id="experiments">
        <p>
            For benchmarking the GPU implementations, the following setup was used. Both GPU algorithms were compiled with nvcc of the CUDA 12.5 module provided on the Marzola cluster of the University of Trento. To measure the speedup compared to the CPU implementations, the <a href="/efficient-matrix-transpose#algorithms" target="_blank"><code>oblivious</code> algorithm</a> was compiled using <code>-O3</code> optimizations. Each resulting binary was evaluated 50 times for matrix sizes between <Katex>2^8</Katex> and <Katex>2^{"{14}"}</Katex>. CUDA algorithms were also benchmarked with block sizes of 4, 8, 16 and 32. The grid size was computed using the matrix and block size. Time was only measured for the kernel execution, so the time for moving data from and to the GPU device is not contained in the measurements. The experiments were only conducted on the Marzola cluster of the University of Trento, since I had not access to other GPUs. On the cluster an Nvidia A30 GPU, with a theoretical peak bandwidth of 933GB/s was used to benchmark the implementations.
        </p>
        <p>
            Let's look at the results obtained during the experiments. Note that the label 'GPU Tiled 16' stands for the second GPU algorithm with a block size of 16. 'GPU Navie' denotes the first GPU algorithm.
        </p>
        <canvas bind:this={canvas_gpu_time} />
        <canvas bind:this={canvas_gpu_bandwidth} />
        <p>
            The most obvious observation is that GPU algorithms perform significantly better than the CPU algorithms. In every scenario, the GPU algorithms have a higher effective bandwidth, compared to the CPU algorithms. In the best case, the effective bandwidth of the GPU algorithm is 94x higher compared to the CPU algorithm. The second observation is that while the effective bandwidth decreases as matrix size increases for CPU algorithms, the effective bandwidth for GPU algorithms
            increases for bigger matrices. The third observation is that the difference in performance between the first and second GPU algorithm is quite small for smaller matrices, but grows as the matrix size increases. That means that for larger matrices, the usage of shared memory has a bigger effect on performance. The fourth observation is that the block size does affect the performance. In the experiments the optimal performance was achieved by using a block size of 16. Increasing the block size to 32 caused a drop in effective bandwidth for all GPU algorithms and matrix sizes.
        </p>
    </ArticleSection>
    <ArticleSection title="Conclusion" id="conclusion">
        <p>
            The main observation made during this project was the significant increase in performance by using GPU acceleration. Using GPUs for parallelization can result in large improvements with respect to effective bandwidth and execution time. We also saw that a careful design of the GPU algorithm is needed. Different implementations and parameter choices can result in significant performance differences, even if the algorithm is executed on a GPU. The presented CUDA kernels could be further improved by using more advanced features of the CUDA platform, such as multiple streaming processors. Another approach could be to finetune the parameter choices. In my experiments, a block size of 16 was optimal, but further parameter choices could be investigated. A multi-GPU implementation could also imporve performance.
        </p>
    </ArticleSection>
    <References citations={citations}/>
</ArticleTemplate>

<style>
    .image-container {
        display: flex;
        justify-content: center;
    }

    img {
        width: 100%;
        max-width: 500px;
    }
</style>