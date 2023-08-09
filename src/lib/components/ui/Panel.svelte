<script lang="ts">
  import { ChevronDown, ChevronUp, X } from 'lucide-svelte';
  import { createCollapsible, melt } from '@melt-ui/svelte';

  export let icon;
  export let title: string;
  export let defaultOpen = false;

  const {
    elements: { root, content, trigger },
    states: { open },
  } = createCollapsible({ defaultOpen });
</script>

<div use:melt={$root}>

  <div use:melt={$trigger} class="h-8 flex items-center justify-between text-sm text-gray-600 bg-white border-b select-none">
    <div class="px-2 flex items-center gap-1.5">
      <svelte:component this={icon} size={16} />
      <span>{title}</span>
    </div>
    <div class="px-1">
      <button class="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
        {#if $open}
          <X size={16} />
        {:else}
          <ChevronUp size={16} />
        {/if}
      </button>
    </div>
  </div>
 
  {#if $open}
    <div use:melt={$content} class="bg-gray-100">
      <slot />
    </div>
  {/if}

</div>