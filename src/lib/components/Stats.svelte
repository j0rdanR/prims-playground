<script>
  import { step } from '../stores/step';
  export let selections;
  export let headers;
  export let pointers;
  export let steps;
</script>

<table class="w-full">
  <tr>
    <th>Stage</th>

    <td class="!flex items-center gap-2">
      <svelte:component this={steps[$step].icon} size={16} strokeWidth={2} class="text-gray-500" />
      {steps[$step].name}
    </td>
  </tr>
  <tr>
    <th>Progress</th>
    <td>
      {#if selections.length / (headers.length - 1) === 1}
        <span class="text-green-700">Complete</span>
      {:else}
        <span class="text-red-700">Incomplete</span>
        ({Math.round(selections.length / (headers.length - 1) * 100)}%)
      {/if}
    </td>
  </tr>
  <!-- <tr>
    <th>Input matrix</th>
    <td class="!line-clamp-none">
      <pre>{matrix.split('],').join('],\n').slice(1, -1)}</pre>
    </td>
  </tr> -->
  <tr>
    <th>Pointers</th>
    <td>
      <span class="text-gray-500 select-none">[</span>
      {pointers.map(v => headers[v]).join(', ')}
      <span class="text-gray-500 select-none">]</span>
    </td>
  </tr>
  <tr>
    <th>Values</th>
    <td>
      <span class="text-gray-500 select-none">[</span>
      {selections.map(v => v.value).join(', ')}
      <span class="text-gray-500 select-none">]</span>
    </td>
  </tr>
  <!-- <tr>
    <th>Sum</th>
    <td>{selections.map(v => v.value).join(' + ')}</td>
  </tr> -->
  <tr>
    <th>MST length</th>
    <td>{selections.reduce((a, v) => (a+v.value), 0)}</td>
  </tr>
</table>

<style lang="postcss">
  tr {
    @apply border-b last:border-b-0 even:bg-gray-50;
  }
  th {
    @apply pr-4 w-[15ch] font-semibold;
  }
  th, td {
    @apply px-3 py-2 text-left align-top;
  }
  td {
    @apply font-mono line-clamp-3;
  }
</style>