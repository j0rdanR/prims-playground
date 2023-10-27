<script>
  export let name;
  export let keybind;
</script>

<div class="flex items-center justify-between py-2 first:pt-0 last:pb-0 border-b border-dotted last:border-none">
  <p class="text-sm">{name}</p>
  <p class="bg-gray-100 text-gray-600 px-2 rounded-full font-mono text-sm">{keybind}</p>
</div>