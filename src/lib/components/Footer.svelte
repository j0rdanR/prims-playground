<script>
  export let version = 'X.X.X';
</script>

<footer class="footer-container">
  <div>
    <p class="max-sm:text-lg sm:truncate"><i>Visualisation of Prim's Algorithm to find a Minimum Spanning Tree</i></p>
  </div>

  <div class="max-sm:space-y-2 sm:flex sm:gap-6">
    <p>Playground created by Jordan Rodrigues</p>
    <p>View the <a href="https://github.com/j0rdanR/prims-playground" target="_blank" rel="noreferrer" class="underline">Source code</a></p>
    <p class="inline-block w-fit px-1 font-mono bg-gray-500 rounded-lg sm:rounded-md">
      <a href="/changelog" class="underline">v{version}</a>
    </p>
  </div>
</footer>



<style lang="postcss">
  .footer-container {@apply
    w-full
    px-4 lg:px-3
    py-5 lg:py-1.5
    flex max-lg:flex-col
    justify-between gap-6
    bg-gray-600
    text-base lg:text-xs text-white
  ;}
</style>