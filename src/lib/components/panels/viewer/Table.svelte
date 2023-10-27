<script lang="ts">
  import { ArrowDownCircle, Info } from 'lucide-svelte';
  import Cell from './Cell.svelte';
  import { inferHeadings } from '../../../utils';

  import { step, steps } from '../../../stores/stepper';

  $: matrix = JSON.parse($steps[$step]?.data || '{ "matrix": [] }').matrix;
  $: pointers = JSON.parse($steps[$step]?.data || '{ "matrix": [] }').pointers;
  $: headers = inferHeadings(matrix.length);
</script>


<div class="w-full h-full flex items-center justify-center text-sm">
  {#if !matrix || matrix.length === 0}
    <p class="text-gray-400 flex items-center gap-2">
      <Info size={16} />
      Generate a new table in the Config tab
    </p>
  {:else}
    <table class="select-none -mt-6">
      <thead>
        <tr class="no-style">
          <th></th>
          {#each headers as _, num}
            <th class="text-blue-500 align-middle">
              {#if pointers?.find(v => v === num) !== undefined}
                <ArrowDownCircle size={20} class="m-auto" />
              {/if}
            </th>
          {/each}
        </tr>
        <tr>
          <th class="text-gray-400">┌</th>
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    
      {#each headers as header, y}
        <tr>
          <th>{header}</th>
          {#key matrix}
            {#each headers as _, x}
              <Cell value={matrix[x][y]} />
            {/each}
          {/key}
        </tr>
      {/each}
    </table>
  {/if}
</div>


<style lang="postcss">
  th {
    @apply w-10 h-10 text-center border bg-gray-50;
  }
  .no-style th {
    @apply w-10 h-10 text-center border-0 bg-transparent;
  }
</style>