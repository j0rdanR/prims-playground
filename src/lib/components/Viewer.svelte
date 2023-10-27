<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  import Table from './panels/viewer/Table.svelte';
  import Graph from './panels/viewer/Graph.svelte';
  import { inferHeadings } from '../utils';
  import { step, steps } from '../stores/stepper';
  import { sizeParam, densityParam, rangeParam } from '../stores/params';

  $: matrix = JSON.parse($steps[$step]?.data || '{ "matrix": [] }').matrix;
  $: headers = inferHeadings(matrix.length);
  
  const {
    elements: { root, list, content, trigger },
  } = createTabs();
</script>

<div use:melt={$root} class="w-full h-full flex flex-col">

  <div use:melt={$list} class="flex justify-between border-b bg-white">
    <div class="flex">
      <button use:melt={$trigger('table')} class="header-tab-trigger">Table</button>
      <button use:melt={$trigger('graph')} class="header-tab-trigger">Graph</button>
    </div>
  </div>

  <div use:melt={$content('table')} class="tab-content">
    <Table />
  </div>
  
  <div use:melt={$content('graph')} class="tab-content">
    {#key matrix}
      <Graph {matrix} {headers} />
    {/key}
  </div>

</div>



<style lang="postcss">
  .tab-content {@apply
    h-full w-full
    outline-none
    overflow-hidden
  ;}
</style>