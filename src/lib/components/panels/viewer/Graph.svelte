<script lang="ts">
  import { onMount } from 'svelte';
  import cytoscape from 'cytoscape';
  import gridGuide from 'cytoscape-grid-guide';

  export let headers;
  export let matrix;

  const nodesFromHeaders = (headers) => {
    return headers?.map(v => ({
      data: { id: v }
    }));
  }
  const edgesFromMatrix = (matrix) => {
    const edges = [];
    for (let y=0; y<headers?.length; y++) {
      for (let x=0; x<headers?.length; x++) {
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

  let cy;
  let container;

  onMount(() => {
    gridGuide( cytoscape );

    cy = cytoscape({
      container,
      layout: {
        fit: true,
        padding: 20,

        // minNodeSpacing: 100,
        // avoidOverlap: true,

        // name: 'cose',
        // componentSpacing: 140,
        // nodeRepulsion: function( node ){ return 802048; },

        name: 'circle',

        // name: 'breadthfirst',
        // roots: ['A'],
        // circle: true,
        // depthSort: function(a, b){ return a.data('weight') - b.data('weight') },
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
            'background-color': '#10b981',
            'border-color': '#047857',
            'border-width': '2px',
            'color': 'white',
            'transition-property': 'background-color',
            'transition-duration': 0.5,
            'transition-timing-function': 'ease-in-out',
          }
        },
        {
          selector: '.selectedEdge',
          css: {
            'width': '3px',
            'line-color': '#10b981'
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


<div bind:this={container} class="relative w-full h-full overflow-hidden">
  <div class="absolute z-50 bottom-2 left-2 px-2 py-1 text-xs text-gray-600 bg-white/90 backdrop-blur-sm border rounded-lg">Hint: Click and drag nodes to reposition</div>
</div>