<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  import Controls from './panels/controls/Controls.svelte';
  import Config from './panels/config/Config.svelte';
  
  const {
    elements: { root, list, content, trigger },
  } = createTabs();
</script>

<div use:melt={$root} class="w-full h-full flex flex-col">
  <div use:melt={$list} class="flex justify-start border-b bg-white">
    <button use:melt={$trigger('controls')} class="header-tab-trigger">Controls</button>
    <button use:melt={$trigger('config')} class="header-tab-trigger">Config</button>
  </div>

  <div use:melt={$content('controls')} class="tab-content">
    <Controls />
  </div>
  
  <div use:melt={$content('config')} class="tab-content">
    <Config />
  </div>
</div>

<style lang="postcss">
  .tab-content {@apply
    h-full w-full
    p-4
    outline-none
  ;}
</style>