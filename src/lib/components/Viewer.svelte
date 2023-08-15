<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  
  const {
    elements: { root, list, content, trigger },
  } = createTabs();
</script>

<div use:melt={$root} class="w-full h-full flex flex-col">

  <div use:melt={$list} class="flex justify-between border-b bg-white" aria-label="Manage your account">
    <div class="flex">
      <button use:melt={$trigger('controls')} class="header-tab-trigger">Table</button>
      <button use:melt={$trigger('config')} class="header-tab-trigger">Graph</button>
    </div>
  </div>

  <div use:melt={$content('controls')} class="tab-content">
    
    
  </div>
  
  <div use:melt={$content('config')} class="tab-content">
    
  </div>

</div>