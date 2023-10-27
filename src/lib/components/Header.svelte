<script>
  import { Download, ExternalLink } from 'lucide-svelte';

  export let cy;
  let src;

  const saveGraph = () => {
    if (cy) {
      src = cy.png();
      const a = document.createElement('a');
      a.href = src;
      a.download = 'diagram.png';
      a.click();
    }
  }
</script>

<header class="w-full h-16 px-4 flex items-center justify-between bg-white border-b">
  <p class="text-lg">
    <span class="font-bold text-blue-500">Prims</span>
    <span class="text-gray-700">Algorithm</span>
    <span class="text-xs italic pl-1">LEGACY</span>
  </p>

  <div class="flex items-center gap-3">
    <a href="https://prims-playground.jrdx.me/" target="_blank" rel="noreferrer" class="px-2 py-1.5 flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
      Latest version
      <ExternalLink size={18} />
    </a>
    <button on:click={saveGraph} class="px-2 py-1.5 flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
      Graph
      <Download size={18} />
    </button>
  </div>
</header>