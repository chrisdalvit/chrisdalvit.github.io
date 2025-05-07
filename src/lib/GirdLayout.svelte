<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    let toc: HTMLHeadingElement[] = [];
    let activeSection = writable(null);

    onMount(() => {
        toc = Array.from(document.querySelectorAll('h3'));
    });

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 64; // Adjust for header height
        let currentSection = null;
        toc.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= sectionTop) {
                currentSection = section.id;
            }
        });
        activeSection.set(currentSection);
    };
</script>

<svelte:window on:scroll={handleScroll} />

<div class="frame">
    <slot name="left">
        <div />
    </slot>
    <slot name="center">
        <div />
    </slot>
    <slot name="right">
        <nav class="toc">
            <ul>
                {#each toc as item}
                    <li>
                        <a class={$activeSection === item.id ? 'active' : ''} href={`#${item.id}`}>{item.innerHTML}</a>
                    </li>
                {/each}
            </ul>
        </nav>
    </slot>
</div>

<style>

    li {
        text-align: start;
    }

    a.active {
        color:  rgba(0, 0, 255, .5);
    }

    ul {
        list-style: none;
    }

    nav {
        position: sticky;
        top: 64px;
        align-self: start;
        margin: 16px;
    }

    li > a {
        font-family: "Sometype Mono", monospace;
        text-decoration: none;
        color: gray;
    }

    li > a:hover {
        font-family: "Sometype Mono", monospace;
        text-decoration: none;
        color:  rgba(0, 0, 255, .5);
    }

    @media only screen and (min-width: 600px) {
        .frame {
            width: 100%;
        }
        .toc {
            display: none;
        }
    }
    
    @media only screen and (max-width: 600px) {
        .frame {
            width: 100%;
        }
        .toc {
            display: none;
        }
    }

    @media only screen and (min-width: 768px) {
        .frame {
            display: grid;
            grid-template-columns: auto 700px auto;
        }
        .toc {
            display: none;
        }
    }

    @media only screen and (min-width: 992px) {
        .frame {
            display: grid;
            grid-template-columns: auto 700px 0.5fr;
        }
        .toc {
            display: block;
        }
    }

    @media only screen and (min-width: 1200px) {
        .frame {
            display: grid;
            grid-template-columns: auto 700px 0.5fr;
        }
        .toc {
            display: block;
        }
    }
</style>