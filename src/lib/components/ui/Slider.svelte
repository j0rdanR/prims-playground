<script lang="ts">
  import { createSlider, melt } from '@melt-ui/svelte';

  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let store;

  if ($$props.default) {
    $store = $$props.default;
  }
 
  const {
    elements: { root, range, thumb },
    states: { value: sliderValue },
  } = createSlider({
    defaultValue: $$props.default || [],
    min,
    max,
    step,
    value: store,
  });

  export const value = sliderValue;
</script>
 
<div class="w-full flex items-center gap-2">
  <span use:melt={$root} class="relative w-full h-[20px] mx-2 flex items-center">
    <span class="block h-[3px] w-full bg-gray-300 rounded-full">
      <span use:melt={$range} class="h-[3px] bg-blue-500 rounded-full" />
    </span>
    {#each $value as _}
      <span
        use:melt={$thumb()}
        class="block h-4 w-4 rounded-full bg-white border-2 border-blue-500 focus:ring-4 focus:ring-black/20"
      />
    {/each}
  </span>
  <p class="min-w-[calc(3ch+4px)]  text-right px-0.5 -py-px text-sm font-mono text-gray-600 ring-1 ring-inset ring-gray-200 rounded-md">{$sliderValue.join('-')}</p>
  <!-- bottom: with dynamic sized data -->
  <!-- <span class="text-sm font-mono text-right text-gray-600 {$sliderValue.length > 1 ?  `min-w-[${$sliderValue.length*3}ch]`:`min-w-[${max.toString().length}ch]`}">{$sliderValue.join('-')}</span> -->
</div>