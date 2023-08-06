<script lang="ts">
  import cytoscape, { type Cytoscape } from 'cytoscape';
  import gridGuide from 'cytoscape-grid-guide';
  import type { AreaChart } from 'lucide-svelte';
  import { onMount } from 'svelte';

  export let headers;
  export let matrix;

  const nodesFromHeaders = (headers) => {
    return headers.map(v => ({
      data: { id: v }
    }));
  }
  const edgesFromMatrix = (matrix) => {
    const edges = [];
    for (let y=0; y<headers.length; y++) {
      for (let x=0; x<headers.length; x++) {
        const cell = matrix[x][y];
        if (!(cell.value === -1 || cell === -1)) {
          const pos = [headers[x], headers[y]].sort()
          edges.push({
            data: {
              id: pos.join('_'),
              source: pos[0],
              target: pos[1],
              weight: cell.value || cell
            },
            classes: 'labelOutline'
          })
        }
      }
    }
    

    let filteredEdges = [];
    edges.forEach(el => {
      if (filteredEdges.findIndex(f => f.data.id === el.data.id) === -1) {
        filteredEdges.push(el)
      }
    });

    return filteredEdges;
  }
  const nodes = nodesFromHeaders(headers);
  const edges = edgesFromMatrix(matrix);

  let container;
  export let cy: Cytoscape;

  onMount(() => {

    gridGuide( cytoscape );

    cy = cytoscape({
      container,
      layout: {
        name: 'concentric',
        fit: true,
        padding: 50,
        minNodeSpacing: 100,
        avoidOverlap: true,
      },
      style: [
        {
          selector: 'node',
          css: {
            'font-family': 'Times New Roman',
            'width': '25px',
            'height': '25px',
            'font-size': '16px',
            'background-color': 'white',
            'border-width': '1px',
            'border-color': 'black',
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        },
        {
          selector: 'edge',
          css: {
            'width': '1px',
            'line-color': '#aaa',
            'label': 'data(weight)',
            // 'text-margin-y': 15,
            'text-rotation': 'autorotate'
          }
        },
        {
          selector: '.labelOutline',
          css: {
            'font-family': 'Times New Roman',
            'color': '#222',
            'text-outline-color': '#f9fafb',
            'text-outline-width': 3
            // "text-background-opacity": 0.8,
            // "color": "#222",
            // "text-background-color": "#fff",
            // "text-background-shape": "roundrectangle",
            // 'text-background-padding': '2px'
          }
        },
        {
          selector: '.selectedNode',
          css: {
            'background-color': '#3b82f6',
            'border-color': '#1d4ed8',
            'border-width': '2px',
            'color': 'white'
          }
        },
        {
          selector: '.selectedEdge',
          css: {
            'width': '3px',
            'line-color': '#3b82f6'
          }
        }
      ],
      elements: {
        nodes,
        edges,
      }
    });

    cy.gridGuide({
      snapToGridDuringDrag: true,
      gridSpacing: 40,
      gridStackOrder: 0,
      snapToGridCenter: false,
      gridColor: '#aaa5',
      panGrid: true,
    });
  });
</script>


<div bind:this={container} class="w-full h-full overflow-hidden"></div>