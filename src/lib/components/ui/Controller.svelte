<script lang="ts">
  import { step } from '../../stores/step';
  import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Cog, Joystick, Sliders, X } from 'lucide-svelte';
  import { keyboardNavigation } from '../../utils';
  import Panel from './Panel.svelte';
  import { createTooltip, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';
  import Shortcut from './Shortcut.svelte';

  const {
    elements: { trigger: triggerL, content: contentL, arrow: arrowL },
    states: { open: openL },
  } = createTooltip({
    positioning: {
      placement: 'top',
    },
    openDelay: 500,
    closeOnPointerDown: false,
    forceVisible: true,
  })
  const {
    elements: { trigger: triggerR, content: contentR, arrow: arrowR },
    states: { open: openR },
  } = createTooltip({
    positioning: {
      placement: 'top',
    },
    openDelay: 500,
    closeOnPointerDown: false,
    forceVisible: true,
  })

  export let steps;
  export let values;
  export let headers;
  export let shuffle;

  $: stepMeta = steps[$step].meta;
  $: stepData = JSON.parse(steps[$step].data);

  let progressBar;
  const progressToClick = (e: MouseEvent) => {
    const rect = progressBar?.getBoundingClientRect()
    const x = e.clientX - rect.x;
    const percentage = x / rect.width * 100;

    // (revertPos / (steps.length - 1)) * 100 = W%
    $step = Math.round((percentage * (steps.length - 1)) / 100)
  }


  export let sizeInput = 6;
  export let densityInput = 70;
</script>

<svelte:window on:keydown={e => $step = keyboardNavigation(steps, $step, e)} />


<Panel icon={Sliders} title="Options" defaultOpen>
  <div class="flex flex-col border-b">
    <div class="px-3 py-2 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Size</p>
      <div class="flex-1 flex items-center gap-4">
        <!-- <input type="text" placeholder="6" bind:value={sizeInput} class="w-[6ch] text-sm font-mono px-2 py-1 border rounded-md">
        <p class="text-xs text-gray-500">The number of nodes in the table/graph</p> -->
        <input type="range" min="2" max="12" step="1" class="w-full accent-emerald-500" bind:value={sizeInput}>
        <span class="w-[3ch] text-right font-mono">{sizeInput}</span>
      </div>
    </div>
    <div class="px-3 py-2 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Density</p>
      <div class="flex-1 flex items-center gap-4">
        <input type="range" min="0" max="100" step="5" class="w-full accent-emerald-500" bind:value={densityInput}>
        <span class="w-[3ch] text-right font-mono">{densityInput}</span>
      </div>
    </div>
    <div class="px-3 py-2 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Shuffle</p>
      <div class="flex items-center gap-4 flex-1">
        <button class="px-2 py-1 text-sm bg-white border rounded-lg" on:click={shuffle}>Generate new table</button>
      </div>
    </div>
  </div>
</Panel>

<Panel icon={Joystick} title="Controls" defaultOpen>
  {#if steps && steps.length !== 0}
    <div class="p-2 flex items-center gap-3 touch-manipulation">
      <button class="stepper-btn" use:melt={$triggerL} on:click={()=>$step--} disabled={$step===0} title="Ctrl/Cmd+&larr;">
        <ArrowLeft size={20} />
      </button>
      {#if $openL}
        <div
          use:melt={$contentL}
          transition:fade={{ duration: 100 }}
          class="z-10 rounded-lg bg-white border shadow-md"
        >
          <div use:melt={$arrowL} />
          <p class="px-1.5 py-1 text-gray-600">Back <Shortcut>&larr;</Shortcut></p>
        </div>
      {/if}
  
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div class="group relative flex-1 h-6 bg-gray-200 border border-gray-300 rounded-full overflow-hidden select-none" on:click={progressToClick} bind:this={progressBar}>
        <div style="width: calc({$step/(steps?.length-1)*100}% + 64px)" class="-translate-x-16 w-full h-full flex items-center justify-end font-mono text-sm text-white bg-emerald-500 rounded-full transition-[width] duration-200">
          <span class="pr-2">{$step}</span>
        </div>
      </div>
  
      <button class="stepper-btn" use:melt={$triggerR} on:click={()=>$step++} disabled={$step===steps?.length-1}>
        <ArrowRight size={20} />
      </button>
      {#if $openR}
        <div
          use:melt={$contentR}
          transition:fade={{ duration: 100 }}
          class="z-10 rounded-lg bg-white border shadow-md"
        >
          <div use:melt={$arrowR} />
          <p class="px-1.5 py-1 text-gray-600">Next <Shortcut>&rarr;</Shortcut></p>
        </div>
      {/if}
    </div>
  {:else}
    <p class="w-full text-center text-sm text-gray-600">Algorithm was unable to solve</p>
  {/if}
  <div class="pb-2 flex flex-col gap-1 border-b">
    <div class="px-3 py-1 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Stage</p>
      <div class="flex items-center gap-2">
        <svelte:component this={stepMeta.icon} size={16} strokeWidth={2} class="text-gray-500" />
        {stepMeta.title || 'Algorithm not computed'}
      </div>
    </div>
    <div class="px-3 py-1 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Progress</p>
      <div>
        <span>
          Step {$step}/{steps?.length - 1 || '?'}
        </span>
        {#if values?.length / (headers.length - 1) === 1}
          (<span class="text-green-700">Solved</span>)
        {:else}
          (<span class="text-red-700">Unsolved</span>)
        {/if}
      </div>
    </div>
  </div>
</Panel>









<style lang="postcss">
  .stepper-btn {@apply
    text-gray-500
    hover:text-gray-700
    disabled:text-gray-300
    transition-colors

    w-10 h-10 flex
    items-center justify-center
    rounded-xl
    enabled:hover:bg-gray-200
    enabled:active:bg-gray-300
  ;}

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
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