<script lang="ts">
  import { createTooltip, melt } from '@melt-ui/svelte';
  import type { SvelteComponent } from 'svelte';
  import { fade } from 'svelte/transition';

  export let icon;
  export let tooltip: string = '';
  export let disabled = false;
  export let builderAction: any = null;

  function action(node, func) {
    if (func) {
      func(node);
    }
  }
 
  const {
    elements: { trigger, content, arrow },
    states: { open },
  } = createTooltip({
    positioning: {
      placement: 'top',
    },
    openDelay: 800,
    closeOnPointerDown: false,
    forceVisible: true,
  });
</script>

<button use:action={builderAction} use:melt={$trigger} class="icon-btn {$$props.class}" on:click {disabled}>
  <svelte:component this={icon} size={20} />
</button>

{#if $open && tooltip !== ''}
  <div
    use:melt={$content}
    transition:fade={{ duration: 80 }}
    class="z-10 bg-blue-50 rounded-md shadow-md"
  >
    <div use:melt={$arrow} />
    <p class="px-2 py-1 text-sm text-gray-700">{tooltip}</p>
  </div>
{/if}