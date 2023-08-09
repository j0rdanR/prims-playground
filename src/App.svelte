<script lang="ts">
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import { GanttChartSquare, Grid, ScatterChart, Sliders } from 'lucide-svelte';
  import Panel from './lib/components/ui/Panel.svelte';
  import Table from './lib/components/visuals/Table.svelte';
  import { step } from './lib/stores/step';
  import { inferHeadings, randomMatrixNew, runPrimsAlgorithm } from './lib/utils';
  import Graph from './lib/components/visuals/Graph.svelte';
  import Stats from './lib/components/ui/Stats.svelte';
  import Controller from './lib/components/ui/Controller.svelte';

  let sizeInput, densityInput;

  let matrix = randomMatrixNew()
  let updateMatrix = 0;
  $: shuffle(sizeInput, densityInput)
  const shuffle = (...args) => {
    matrix = randomMatrixNew({
      size: sizeInput || 6,
      density: densityInput || 65,
    });
    updateMatrix++;
  }
  const shuffleKeybind = (e) => {
    if (e.metaKey && e.key === '0') {
      e.preventDefault();
      shuffle()
    }
  }
  // let matrix = [
  //   [-1, 7900, 10300, -1, 7100, -1, -1],
  //   [7900, -1, 7600, 6200, 6500, -1, 15400],
  //   [10300, 7600, -1, 8500, -1, 12200, 9200],
  //   [-1, 6200, 8500, -1, 8000, 4700, 9800],
  //   [7100, 6500, -1, 8000, -1, 4800, -1],
  //   [-1, -1, 12200, 4700, 4800, -1, 10100],
  //   [-1, 15400, 9200, 9800, -1, 10100, -1]
  // ]
  let headers = inferHeadings(matrix.length);
  $: headers = inferHeadings(matrix.length);
  let pointers = [];
  let values = [];
  // let steps = [];

  let steps = runPrimsAlgorithm(matrix, headers);
  $: steps = runPrimsAlgorithm(matrix, headers);

  const revertTo = (pos) => {
    const data = JSON.parse(steps[pos].data)
    matrix = data.matrix;
    pointers = data.pointers;
    values = data.values;
  }
  $: revertTo($step);


  // result.steps[$step].beforeRetrieve();
  // $: matrix = result.steps[$step].matrix;
  // $: pointers = result.steps[$step].pointers;
  // $: values = result.steps[$step].selections;
  // $: steps = result.steps

  // console.log($step, matrix, pointers, values)
  // const loop = setInterval(() => {
  //   matrix = randomMatrixNew();
  // }, 50);
</script>

<svelte:window on:keydown={shuffleKeybind} />

<div class="w-full h-full flex flex-col overflow-hiddenX">
  <Header />
  <div class="w-full flex-1 flex">
    <div class="flex-1 sm:max-w-[50vw] flex flex-col bg-white sm:border-r">
      <Panel icon={Grid} title="Table" defaultOpen>
        <div class="w-full flex-1 p-8 pt-4 border-b bg-gray-100 overflow-auto">
          <Table {headers} {matrix} {pointers} />
        </div>
      </Panel>
      <div class="">
        <Controller {steps} {headers} {values} {shuffle} bind:sizeInput bind:densityInput />
      </div>
      <div class="hidden md:block">
        <Stats {steps} {headers} {pointers} {values} />
      </div>
    </div>
  
    <div class="w-full h-full flex-1 bg-gray-50">
      {#key updateMatrix}
        <Graph {headers} {matrix} {values} />
      {/key}
    </div>
  </div>
  <Footer version="0.1.0" />
</div>




<!-- <Header />

<div class="fixed top-16 bottom-7 inset-x-0 flex gap-px bg-gray-200">
  <div class="flex-[0.7]">
    <Panel icon={Sliders} title="Controls">
      <button on:click={() => clearInterval(loop)}>Stop</button>
      <Controller {steps} />
      <Stats {headers} {pointers} {values} {steps} />
    </Panel>
  </div>

  <div class="flex-1 flex flex-col gap-px bg-gray-200">
    <Panel icon={GanttChartSquare} title="Preview">
      <Table {headers} {matrix} {pointers} />
    </Panel>
    <Panel icon={ScatterChart} title="Graph">
      {#key matrix}
        <Graph {headers} {matrix} />
      {/key}
    </Panel>
  </div>
</div>

<Footer /> -->