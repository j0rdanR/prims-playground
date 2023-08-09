<script>
  import { BarChartHorizontalBig } from 'lucide-svelte';
  import { step } from '../../stores/step';
  import Panel from './Panel.svelte';
  export let values;
  export let headers;
  export let pointers;
  export let steps;

  $: stepMeta = steps[$step].meta;
  $: stepData = JSON.parse(steps[$step].data);
</script>

<Panel icon={BarChartHorizontalBig} title="Statistics">
  <div class="py-2 flex flex-col gap-1">

    <div class="px-3 py-1 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Pointers</p>
      <div class="flex items-center gap-2 font-mono">
        <span class="text-gray-500 select-none">[</span>
        {pointers?.map(v => headers[v]).join(', ')}
        <span class="text-gray-500 select-none">]</span>
      </div>
    </div>

    <div class="px-3 py-1 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">Stage</p>
      <div class="flex items-center gap-2 font-mono">
        <span class="text-gray-500 select-none">[</span>
        {values?.map(v => v.value).join(', ')}
        <span class="text-gray-500 select-none">]</span>
      </div>
    </div>
    
    <div class="px-3 py-1 flex items-center gap-4">
      <p class="text-sm font-medium min-w-[14ch]">MST Length</p>
      <div class="flex items-center gap-2 font-mono">
        {values?.reduce((a, v) => (a+v.value), 0)}
      </div>
    </div>

  </div>
</Panel>

<!-- <table class="w-full">
  <tr>
    <th>MST length</th>
    <td>{values?.reduce((a, v) => (a+v.value), 0)}</td>
  </tr>
</table> -->

<style lang="postcss">
  tr {
    @apply border-b even:bg-gray-50;
  }
  th {
    @apply pr-4 w-[15ch] text-sm font-medium;
  }
  th, td {
    @apply px-3 py-2 text-left align-top;
  }
  td {
    @apply font-mono line-clamp-3;
  }
</style>