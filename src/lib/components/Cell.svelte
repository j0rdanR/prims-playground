<script lang="ts">
  export let value;
  let tw = '';

  const renderValue = (v) => {
    if (v === -1) {
      tw += ' text-gray-500'
      return '-';
    } else if (typeof v === 'object') {
      if (v.type === 'selected') {
        tw += ' !bg-yellow-100';
        return v.value;
      } else if (v.type === 'deleted') {
        tw += ' text-gray-300';
        return v.value === -1 ? '-' : v.value;
      }
    }

    return v;
  }

  $: output = renderValue(value)
</script>

<td class={tw}>
  {output}
</td>


<style lang="postcss">
  td {
    @apply relative w-10 h-10 text-center border bg-white;
  }

  td:before {
    content: '';
    top: 2px;
    left: 0; right: 0;
    height: 4px;
    background-color: red;
  }
</style>