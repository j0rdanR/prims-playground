<script lang="ts">
  import { step } from '../stores/step';
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
  export let steps;

  let progressBar;
  const handle = (e: MouseEvent) => {
    const rect = progressBar?.getBoundingClientRect()
    const x = e.clientX - rect.x;
    const percentage = x / rect.width * 100;
    // progressBar.firstElementChild.style.width = `calc(${percentage}% + 64px)`;

    // (revertPos / (steps.length - 1)) * 100 = W%
    $step = Math.round((percentage * (steps.length - 1)) / 100)
  }
</script>

<!-- <input
  type="range"
  min="0" max={steps.length - 1}
  bind:value={revertPos}
  on:input
  class="appearance-none relative w-full h-10 overflow-hidden rounded-none range-track"
/> -->

<!-- <label class="flex items-center flex-1 gap-4">
  Steps
  <input
    type="range"
    min="0" max={steps.length - 1}
    bind:value={revertPos}
    on:input
    class="appearance-none w-full h-8 bg-gray-100 border rounded-lg overflow-hidden"
    />
</label> -->

<button on:click={()=>$step--} disabled={$step===0}>
  <ArrowLeft size={20} />
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="group relative flex-1 h-6 bg-gray-100 border rounded-full overflow-hidden select-none" on:click={handle} bind:this={progressBar}>
  <div style="width: calc({$step/(steps.length-1)*100}% + 64px)" class="-translate-x-16 w-full h-full flex items-center justify-end font-mono text-sm text-white bg-blue-500 rounded-full transition-[width] duration-300">
    <span class="pr-2">{$step}</span>
  </div>
</div>

<div class="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 px-2 py-1 font-mono text-gray-600 bg-white border rounded-lg">
  Step {$step}/{steps.length - 1}
</div>

<button on:click={()=>$step++} disabled={$step===steps.length-1}>
  <ArrowRight size={20} />
</button>

<!-- <span class="min-w-[5ch] text-right font-mono text-lg">{revertPos}/{steps.length - 1}</span> -->








<style lang="postcss">
  button {@apply
    text-gray-500
    hover:text-gray-700
    disabled:text-gray-200
    transition-colors

    w-10 h-10 flex
    items-center justify-center
    rounded-xl
    enabled:hover:bg-gray-100
    enabled:active:bg-gray-200
  ;}
</style>

<!-- <style>
  .range-track::-webkit-slider-runnable-track {
    @apply bg-gray-100;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; /* 1 */
    height: 40px;
    background: #fff;
    box-shadow: -50vw 0 0 50vw dodgerblue; /* 2 */
    border: 2px solid #ccc; /* 1 */
  }

  ::-moz-range-track {
    height: 40px;
    background: #ddd;
  }

  ::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 20px;
    border: 3px solid #999;
    border-radius: 0 !important;
    box-shadow: -50vw 0 0 50vw dodgerblue;
    box-sizing: border-box;
  }

  ::-ms-fill-lower { 
    background: dodgerblue;
  }

  ::-ms-thumb { 
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
  }

  ::-ms-ticks-after { 
    display: none; 
  }

  ::-ms-ticks-before { 
    display: none; 
  }

  ::-ms-track { 
    background: #ddd;
    color: transparent;
    height: 40px;
    border: none;
  }

  ::-ms-tooltip { 
    display: none;
  }
</style> -->