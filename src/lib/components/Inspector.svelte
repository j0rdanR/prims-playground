<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  
  const {
    elements: { root, list, content, trigger },
  } = createTabs();
</script>

<div use:melt={$root} class="w-full h-full flex flex-col">

  <div use:melt={$list} class="flex justify-start border-b bg-white" aria-label="Manage your account">
    <button use:melt={$trigger('controls')} class="header-tab-trigger">Controls</button>
    <button use:melt={$trigger('config')} class="header-tab-trigger">Config</button>
  </div>

  <div use:melt={$content('controls')} class="tab-content">
    <p class="mb-5 leading-normal text-magnum-950">
      Make changes to your account here. Click save when you're done.
    </p>
    
  </div>
  
  <div use:melt={$content('config')} class="tab-content">
    <p class="mb-5 leading-normal text-magnum-950">
      Change your password here. Click save when you're done.
    </p>
  </div>

</div>

<style lang="postcss">
  .tab-content {@apply
    p-4
  ;}
</style>