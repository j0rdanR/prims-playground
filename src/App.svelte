<script lang="ts">
  import Header from './lib/components/header/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Inspector from './lib/components/Inspector.svelte';
  import Viewer from './lib/components/Viewer.svelte';
  import Shortcuts from './lib/components/Shortcuts.svelte';
  import { onMount } from 'svelte';
  import { newScenario } from './lib/utils';
  import Stepper from './lib/components/panels/controls/Stepper.svelte';
  import MobileInspector from './lib/components/MobileInspector.svelte';

  // generate default scenario on load
  onMount(newScenario);
</script>

<div class="fixed inset-0 overflow-hidden flex flex-col">
  <Header />

  <div class="flex-1 flex max-md:flex-col">

    <!-- desktop controls -->
    <aside class="max-md:hidden flex-1 min-w-[384px] bg-white border-r">
      <Inspector />
    </aside>

    <Viewer />

    <!-- mobile controls -->
    <div class="md:hidden relative">
      <Stepper />
      <div class="absolute bottom-full right-2 mb-2">
        <MobileInspector />
      </div>
    </div>
  </div>

  <!-- svelte-ignore missing-declaration -->
  <Footer version={APP_VERSION} />  
</div>

<Shortcuts />