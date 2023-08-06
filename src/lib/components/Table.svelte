<script lang="ts">
  import { ArrowDownCircle } from 'lucide-svelte';
  import Cell from './Cell.svelte';

  export let headers: string[];  
  export let matrix;
  export let pointers;
</script>


<table class="select-none -mt-6">
  <thead>
    <tr class="no-style">
      <th></th>
      {#each headers as _, num}
        <th class="text-blue-500 align-middle">
          {#if pointers.find(v => v === num) !== undefined}
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


<style lang="postcss">
  th {
    @apply w-10 h-10 text-center border bg-gray-50;
  }
  .no-style th {
    @apply w-10 h-10 text-center border-0 bg-transparent;
  }
</style>