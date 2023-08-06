<script lang="ts">
  import Table from './lib/components/Table.svelte';
  import { killRow, smallestOfPointers } from './lib/utils';
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Capture from './lib/Capture';
  import Graph from './lib/components/Graph.svelte';
  import Stats from './lib/components/Stats.svelte';
  import Controller from './lib/components/Controller.svelte';
  import { step } from './lib/stores/step';
  import { Hourglass, Tally1, Tally2, Tally3, Tally4, Tally5, CheckCircle } from 'lucide-svelte';


  const headers = ['A', 'B', 'C', 'D', 'E', 'F'];
  let matrix: Array<(object|number)[]> = [
    [   -1   , 210  , -1   , -1   , 260  , -1    ],

    [   210  , -1   , 460  , -1   , -1   , 360   ],
    
    [   -1   , 460  , -1   , 260  , -1   , 310   ],
    
    [   -1   , -1   , 260  , -1   , 360  , 260   ],
    
    [   260  , -1   , -1   , 360  , -1   , 340   ],
    
    [   -1   , 360  , 310  , 260  , 340  , -1    ]
  ];
  
  // const headers = ['A', 'B', 'C', 'D', 'E', 'F'];
  // let matrix: Array<(object|number)[]> = [
  //   [   -1   , 10   , -1   , -1   , 10   , -1    ],

  //   [   10   , -1   , 10   , -1   , -1   , -1    ],
    
  //   [   -1   , 10   , -1   , 7    , 10   , 6     ],
    
  //   [   -1   , -1   , 7    , -1   , 8    , -1    ],
    
  //   [   10   , -1   , 10   , 8    , -1   , 7     ],
    
  //   [   -1   , -1   , 6    , -1   , 7    , -1    ]
  // ];

  let pointers = [];
  let selections = [];  
  const steps: Capture[] = [];
  steps.push(new Capture(Hourglass, 'Idle', matrix, pointers, selections));
  
  // 1. Pick a starting point
  pointers.push(0)
  steps.push(new Capture(Tally1, 'Pick a starting point', matrix, pointers, selections));
  
  // 2. Cross it off
  matrix = killRow(matrix, 0);
  steps.push(new Capture(Tally2, 'Cross initial row off (prevents cycle)', matrix, pointers, selections));


  for (const _ of headers.slice(1)) {

    // 3. Find the smallest value
    const smallest = smallestOfPointers(matrix, pointers);
    matrix[smallest.x][smallest.y] = { type: 'selected', value: matrix[smallest.x][smallest.y] }
    selections.push(smallest);
    steps.push(new Capture(Tally3, `Find smallest value of all pointers (${smallest.value} in ${headers[smallest.y]})`, matrix, pointers, selections));
    
    // skip other steps on last iteration; algo has already finished
    if (headers.indexOf(_) !== headers.length - 1) {
      // 5. Cross this row off
      killRow(matrix, smallest.y, smallest.x);
      steps.push(new Capture(Tally4, `Cross off row which value resides in (${headers[smallest.y]})`, matrix, pointers, selections));

      // 4. Add a pointer
      pointers.push(smallest.y);
      steps.push(new Capture(Tally5, `Add pointer to ${headers[smallest.y]}`, matrix, pointers, selections));
    }
  }

  // complete
  steps.push(new Capture(CheckCircle, `Algorithm finished`, matrix, pointers, selections));
  
  // 6. Find the next smallest value (of all pointers)

  const revertTo = (pos) => {
    steps[pos].beforeRetrieve();
    matrix = steps[pos].matrix;
    pointers = steps[pos].pointers;
    selections = steps[pos].selections;
  }
  $: revertTo($step);

  const keydown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      $step > 2 ? ($step -= 3) : ($step = 0);
    }
    else if (e.shiftKey && e.key === 'ArrowRight') {
      e.preventDefault();
      $step < (steps.length - 3) ? ($step += 3) : ($step = steps.length - 1);
    }
    else if (e.metaKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      $step = 0;
    }
    else if (e.metaKey && e.key === 'ArrowRight') {
      e.preventDefault();
      $step = steps.length - 1;
    }
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      $step > 0 && $step--;
    }
    else if (e.key === 'ArrowRight') {
      e.preventDefault();
      $step < (steps.length - 1) && $step++
    }
  }

  let cy;
  let highlighted = [];
  const highlightEdge = (cy, x, y) => {
    if (cy) {
      highlighted.push({ x, y })
      const pos = [headers[x], headers[y]].sort();
      cy.$(`#${pos[0]}_${pos[1]}`).addClass('selectedEdge');
      cy.$(`#${pos[0]}`).addClass('selectedNode');
      cy.$(`#${pos[1]}`).addClass('selectedNode');
    }
  }
  const highlightSelections = selections => {
    if (cy) {
      highlighted.forEach(h => {
        const pos = [headers[h.x], headers[h.y]].sort();
        cy.$(`#${pos[0]}_${pos[1]}`).removeClass('selectedEdge')
      })
      highlighted.forEach(h => {
        const pos = [headers[h.x], headers[h.y]];
        cy.$(`#${pos[0]}`).removeClass('selectedNode')
        cy.$(`#${pos[1]}`).removeClass('selectedNode')
      })
    }
    selections.forEach(s => highlightEdge(cy, s.x, s.y))
  }

  $: highlightSelections(selections);
</script>

<svelte:window on:keydown={keydown} />


<!-- <div class="w-full max-w-4xl p-12 flex items-center justify-around gap-16 bg-white border rounded-xl"> -->

<div class="w-full h-full flex flex-col overflow-hidden">
  <Header bind:cy />
  <div class="w-full flex-1 flex max-sm:flex-col-reverse">
    <div class="flex-1 sm:max-w-[50vw] flex flex-col bg-white sm:border-r">
      <div class="w-full flex-1 p-8 flex items-center justify-center border-b bg-gray-100">
        <Table {headers} {matrix} {pointers} />
      </div>
      <div class="relative p-2 flex items-center gap-3 sm:border-b touch-manipulation">
        <Controller {steps} on:input={revertTo} />
      </div>
      <div class="hidden md:block">
        <Stats {steps} {headers} {pointers} {selections} />
      </div>
    </div>
  
    <div class="max-sm:hidden w-full flex-1 bg-gray-50 max-sm:border-b">
      <Graph {headers} {matrix} bind:cy />
    </div>
  </div>
  <Footer />
</div>