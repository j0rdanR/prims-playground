<script lang="ts">
  import Header from './lib/components/header/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Inspector from './lib/components/Inspector.svelte';
  import Viewer from './lib/components/Viewer.svelte';
  import Shortcuts from './lib/components/Shortcuts.svelte';
  import { onMount } from 'svelte';
  import { newScenario } from './lib/utils';

  // generate default scenario on load
  onMount(newScenario);
</script>

<div class="fixed inset-0 overflow-hidden flex flex-col">
  <Header />

  <div class="flex-1 flex">
    <aside class="flex-1 max-w-sm border-r bg-white">
      <Inspector />
    </aside>
    <div class="w-full flex-1">
      <Viewer />
    </div>
  </div>

  <Footer version={APP_VERSION} />  
</div>

<Shortcuts />