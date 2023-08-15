<script lang="ts">
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Inspector from './lib/components/Inspector.svelte';
  import Viewer from './lib/components/Viewer.svelte';
</script>

<div class="fixed inset-0 overflow-hidden flex flex-col">
  <Header />

  <div class="flex-1 flex">
    <aside class="min-w-[320px] max-w-sm border-r bg-white">
      <Inspector />
    </aside>
    <div class="w-full flex-1">
      <Viewer />
    </div>
  </div>

  <Footer version="1.2.0" />  
</div>