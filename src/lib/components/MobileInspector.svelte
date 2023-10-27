<script>
  import { createDialog, melt } from '@melt-ui/svelte';
  import { BarChart3, X } from 'lucide-svelte';
  import IconButton from './ui/IconButton.svelte';
  import Inspector from './Inspector.svelte';

  const {
    elements: {
      trigger, overlay,
      content, title, description,
      close, portalled,
    },
    states: { open },
  } = createDialog({
    forceVisible: true,
  });
</script>


<button use:melt={$trigger} class="icon-btn w-12 h-12  border border-gray-200 bg-white/90">
  <BarChart3 size={20} />
</button>


<div use:melt={$portalled}>
  {#if $open}
    <div use:melt={$content} class="fixed inset-0 bg-white/90 backdrop-blur">
      <Inspector />
 
      <button
        use:melt={$close}
        aria-label="close"
        class="fixed top-2 right-2"
      >
        <X size={20} class="text-gray-500" />
      </button>
    </div>
  {/if}
</div>