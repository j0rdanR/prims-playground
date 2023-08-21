<script lang="ts">
  export let title: string;
</script>

<div class="flex flex-col gap-0.5 border-b pb-4">
  <p class="pb-1 font-mono text-xs uppercase tracking-wide text-gray-500 select-none">{title}</p>  
  <slot />
</div>