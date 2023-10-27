<script lang="ts">
  import { GITHUB_REPO_URL } from '../../utils';
  import HeaderIcon from './HeaderIcon.svelte';
  import { HelpCircle } from 'lucide-svelte';
</script>

<HeaderIcon
  trigger={{
    icon: HelpCircle,
    tooltip: 'Help'
  }}
>
  <svelte:fragment slot="title">
    Help and info
  </svelte:fragment>
  <svelte:fragment slot="description">
    "A simple website to help visualise how Prim's algorithm works"
  </svelte:fragment>

  <hr>

  <div class="prose prose-sm mt-4 max-h-[65vh] overflow-auto">
    <p>This project is fully open source, and you can view the full <a href={GITHUB_REPO_URL}>repository on GitHub</a>. Feel free to raise any issues, although I don't plan to work on this project for much longer.</p>
    <p>By default, when you open the app, an example table/matrix is randomly created for you. From there, you can play around with the inspector and watch the table and graph update right away.</p>
  

    <h3>Navigating the algorithm</h3>

    <p>Use the arrows in the bottom left to cycle between the steps of the algorithm. Press 'Next step' to walk through each step individually, or press 'Skip to end' to see the final result.</p>

    <p>Hold 'Shift + Alt' and use the arrow keys to jump by three steps at once. It's also the perfect amount, where the algorithm will stay on the same stage (the tally you see at the top of the 'Controls' panel, not to be confused with step number).</p>


    <h3>Visualising the data</h3>

    <p>The right panel allows you to switch between the 'Table' and 'Graph' views. Both are referring to the same data, where the table is simply an adjacency matrix for the graph.</p>

    <p>As you run the algorithm, cells in the table will be highlighted (these are the edges of the Minimum Spanning Tree). The corresponding edges in the tree will also be highlighted, and a highlighted tree will start to form within the graph.</p>


    <h3>Interpreting the statistics</h3>

    <p>Within the 'Controls' panel features some statistics about the algorithm's state.</p>
    
    <p>The <code>stage</code> refers to the phase of the Prim's algorithm which is currently being executed at that current step. Note that the stages might repeat, such as when the algorithm is repeatedly checking for the smallest value of all pointers.</p>

    <p>The <code>progress</code> indicator determines whether the matrix is 'solved'. An example is considered to be solved completely when a MST is produced.</p>

    <p>The <code>pointers</code> list is a log of all the columns the algorithm should scan when looking for the smallest value. They are in the order of which they are added, with 'A' always being first (as the algorithm always starts with A). These will also correspond to the arrows above the table.</p>

    <p>The <code>values</code> list is a log of all cells collected by the algorithm in it's search for the smallest edges. This corresponds to the cells highlighted yellow in the table, and the edges highlighted blue on the graph.</p>

    <p>The <code>MST length</code> is the sum of all values collected by the algorithm at its current step.Once the progress indicator is complete, this value will represent the total length of the Minimum Spanning Tree.</p>

    
    <h3>Customising the example</h3>

    <p>To generate a different table, or customise the parameters, click on the 'Config' tab in the left panel.</p>

    <p>The <code>size</code> parameter corresponds to the width/height of the table, so a size of <code>6</code> creates a 6x6 table.</p>

    <p>The <code>density</code> parameter (should) determine how connected the vertices are. Values closer to zero create an empty table with little connections, while values closer to 100 create a filled table which is more connected.</p>
    <p class="italic text-sm font-medium px-3 py-2 rounded-lg bg-red-100 text-red-900">The density parameter is currently unpredictable, and does not work as intended. For the best results, it is recommended that you use the default value (50).</p>

    <p>The <code>range</code> parameter limits the size of each cell's values (weights of edges). The application currently lets you work with whole numbers between 0-300.</p>

    <p>Once you're happy with the parameters, press 'Generate' at the bottom of the config panel. You can press it multiple times until you're satisfied with the output. Alternatively, you can generate a new example from anywhere at any time using the shortcut, 'Ctrl/Cmd + G'</p>
  </div>

</HeaderIcon>