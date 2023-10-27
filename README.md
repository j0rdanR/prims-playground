# Prims Playground

Play around with Prim's algorithm - learn how it works, and see what the graph looks like in real time!

> I created this mostly for fun, so don't expect any bug fixes are feature updates. I just wanted to make a cool interface that does something small, so the actual algorithm isn't optimised.


## Roadmap

- [ ] Fix graph rendering off-screen by default
- [ ] Reintroduce path highlighting for the min spanning tree
- [ ] Add download button to export graph as png
- [x] Documentation for keyboard shortcuts
- [x] Documentation for help dialog
- [x] Optimise ui elements for mobile viewing
- [ ] Refactor internal algorithm code


## Features

### Run the algorithm

Walk through each step of the algorithm manually, or skip to the end to see the final result:

https://github.com/j0rdanR/prims-playground/assets/96402459/c4c488cd-efab-44dd-99c4-baec1cce6eb2

You can use the arrows on your keyboard or next to the progress bar. Alternatively, click anywhere on the progress bar to skip to that step.

> Hold `Shift+ArrowKey` to skip forward three steps, and `Ctrl/Cmd+ArrowKey` to switch between the start and finish.


### View the stats

Underneath the progress bar is a (live) list of statistics, including:

- Step of the algorithm itself
- Completion state
- List of the active pointers (in the order they were added)
- List of the smallest values
- Total length of the Min Spanning Tree found


### Watch the graph

Whenever a new smallest value is found, it is added to the graph in real time. As you increment the steps, a spanning tree will start to form within the graph (connecting all vertices).

Once finished, the MST will be highlighted. You can drag around points and pan across the graph to make it more readable if your like.

> Click the button at the top to download a png of the graph.



## Changelog

Available within the source code [over here](https://github.com/j0rdanR/prims-playground/blob/main/CHANGELOG.md)



## Installing locally

The app is a vanilla Svelte website with Vite as the build tool. You can easily reproduce the dashboard on your machine if the hosted version is offline/no longer working.

1. Make sure you have `npm` and `node` installed on your machine:

```zsh
$  npm -v
9.6.7

$ node -v
v20.3.1
```

2. Install the dependencies by running this command in the source code's folder:

```zsh
npm install
```

3. You can then run the development server, or build and preview locally:

```zsh
npm run dev
# or
npm run build      # generate static dist folder
npm run preview    # serve /dist on webserver
```

4. Go to the address listed in your terminal (after running the previous command) in a web browser. The default address should be http://localhost:5123