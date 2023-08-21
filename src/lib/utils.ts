import { Hourglass, Tally1, Tally2, Tally3, Tally4, Tally5, CheckCircle } from 'lucide-svelte';


export const killRow = (matrix, mY, selectionIndex?) => {
  matrix.forEach((_, mX) => {
    let type;
    if (mX === selectionIndex) type = 'selected';
    else type = 'deleted';

    if (typeof matrix[mX][mY] === 'number') {
      matrix[mX][mY] = { type, value: matrix[mX][mY] };
    }
  });

  return matrix;
}


export const smallestOfPointers = (matrix, pointers) => {
  let smallest = { value: null, x: null, y: null };
  
  pointers.forEach(pointerX => {
    const column = matrix[pointerX];
    const columnFiltered = column.filter(v => {
      if (
        v === -1 ||
        typeof v !== 'number'
      ) return false;
      else return true;
    });
  
    const min = Math.min(...columnFiltered);
    const minY = column.indexOf(min);
  
    if (smallest.value === null || min < smallest.value) {
      smallest = {
        value: min,
        x: pointerX,
        y: minY
      };
    }
  
  });
  
  return smallest;
}


export const runPrimsAlgorithm = (baseMatrix, headers) => {
  let matrix = baseMatrix;
  const steps = [];
  const pointers = [];
  const values = [];

  // 0: Initial state (uncomputed)
  steps.push({
    meta: {
      icon: Hourglass,
      title: 'Idle'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });

  // 1. Pick a starting point
  pointers.push(0)
  steps.push({
    meta: {
      icon: Tally1,
      title: 'Pick a starting point -> `A`'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });
  
  // 2. Cross it off
  matrix = killRow(matrix, 0);
  steps.push({
    meta: {
      icon: Tally2,
      title: 'Cross initial row off (prevents cycle)'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });


  // algorithm finds (n - 1) smallest values
  for (const _ of headers.slice(1)) {

    // 3. Find the smallest value
    const smallest = smallestOfPointers(matrix, pointers);
    matrix[smallest.x][smallest.y] = { type: 'selected', value: matrix[smallest.x][smallest.y] }
    values.push(smallest);
    steps.push({
      meta: {
        icon: Tally3,
        title: `Smallest of all pointers -> \`${smallest.value}\` in column \`${headers[smallest.x]}\``
      },
      data: JSON.stringify({
        matrix, pointers, values
      })
    });
    
    // skip other steps on last iteration; algo has already finished
    if (headers.indexOf(_) !== headers.length - 1) {
      // 5. Cross this row off
      killRow(matrix, smallest.y, smallest.x);
      steps.push({
        meta: {
          icon: Tally4,
          title: `Cross off row which value resides in -> \`${headers[smallest.y]}\``
        },
        data: JSON.stringify({
          matrix, pointers, values
        })
      });

      // 4. Add a pointer
      pointers.push(smallest.y);
      steps.push({
        meta: {
          icon: Tally5,
          title: `Add pointer to \`${headers[smallest.y]}\``
        },
        data: JSON.stringify({
          matrix, pointers, values
        })
      });
    } else {
      killRow(matrix, smallest.y, smallest.x);
    }
  }

  // complete
  steps.push({
    meta: {
      icon: CheckCircle,
      title: `Algorithm finished`
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });

  return steps;
}


// TODO: optimise this function and remove overhead
export const runPrimsAlgorithmNew = baseMatrix => {
  let matrix = baseMatrix;
  const headers = inferHeadings(matrix.length);
  const steps = [];
  const pointers = [];
  const values = [];
  let valuesIndex = 0;

  // 0: Initial state (uncomputed)
  steps.push({
    meta: {
      icon: Hourglass,
      title: 'Idle'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });

  // 1. Pick a starting point
  pointers.push(0)
  steps.push({
    meta: {
      icon: Tally1,
      title: 'Pick a starting point -> `A`'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });
  
  // 2. Cross it off
  matrix = killRow(matrix, 0);
  steps.push({
    meta: {
      icon: Tally2,
      title: 'Cross initial row off (prevents cycle)'
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });


  // algorithm finds (n - 1) smallest values
  for (const _ of headers.slice(1)) {

    // 3. Find the smallest value
    const smallest = smallestOfPointers(matrix, pointers);
    matrix[smallest.x][smallest.y] = { type: 'selected', value: matrix[smallest.x][smallest.y] }
    values.push({ id: valuesIndex, ...smallest });
    valuesIndex++;
    steps.push({
      meta: {
        icon: Tally3,
        title: `Smallest of all pointers -> \`${smallest.value}\` in column \`${headers[smallest.x]}\``
      },
      data: JSON.stringify({
        matrix, pointers, values
      })
    });
    
    // skip other steps on last iteration; algo has already finished
    if (headers.indexOf(_) !== headers.length - 1) {
      // 5. Cross this row off
      killRow(matrix, smallest.y, smallest.x);
      steps.push({
        meta: {
          icon: Tally4,
          title: `Cross off row which value resides in -> \`${headers[smallest.y]}\``
        },
        data: JSON.stringify({
          matrix, pointers, values
        })
      });

      // 4. Add a pointer
      pointers.push(smallest.y);
      steps.push({
        meta: {
          icon: Tally5,
          title: `Add pointer to \`${headers[smallest.y]}\``
        },
        data: JSON.stringify({
          matrix, pointers, values
        })
      });
    } else {
      killRow(matrix, smallest.y, smallest.x);
    }
  }

  // complete
  steps.push({
    meta: {
      icon: CheckCircle,
      title: `Algorithm finished`
    },
    data: JSON.stringify({
      matrix, pointers, values
    })
  });

  return steps;
}






export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomMatrix = () => {
  const nodeCount = rand(4, 10)
  const mtr = [
    [],[],[],[],[],[]
  ];

  for (let x = 0; x < 6; x++) {
    
    function repeatUntilConnected() {
      for (let y = 0; y < 6; y++) {
        if (x === y) {
          mtr[x][y] = -1;
        } else if (rand(1, 100) > 75 || mtr[y][x]) {
          mtr[x][y] = mtr[y][x] || rand(20, 120);
        } else {
          mtr[x][y] = -1;
        }
      }
      if (mtr[x].findIndex(v => v > 0) === -1) {
        console.log(`${x} has no connections`);
        repeatUntilConnected()
      }
    }

    repeatUntilConnected()

  }

  return mtr;
}

export interface MatrixGeneratorOptions {
  /** User defined fixed size of the matrix */
  size: number;
  /** If size is not provided, the minimum size of the matrix */
  sizeMin: number;
  /** If size is not provided, the maximum size of the matrix */
  sizeMax: number;
  /** The density of the matrix - lower number results in a scarse matrix */
  density: number;

  range: number[];
}

export const randomMatrixNew = (options?: Partial<MatrixGeneratorOptions>) => {
  const size = options?.size || rand(options?.sizeMin || 4, options?.sizeMax || 12);
  const density = options?.density || 65;
  const range = options?.range || [20, 100];
  const mtr = [];

  for (let x = 0; x < size; x++) {
    let col = Array.from({ length: size }, () => rand(range[0], range[1]));

    col.forEach((_, y) => {
      if (x === y) {
        // prevent loops from occurring
        col[y] = -1;
      } else if (mtr[y] && mtr[y][x]) {
        // ensure matrix is adjacent; always prefer corresponding value
        col[y] = mtr[y][x];
      } else if (col.filter(v => v !== -1).length > 1) {
        if (rand(1, 100) > density) {
          col[y] = -1;
        }
      }
    })

    mtr.push(col)
  }

  // console.log(mtr)
  return mtr;
}

export const inferHeadings = (matrixSize: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars.slice(0, matrixSize).split('');
}

import { sizeParam, densityParam, rangeParam } from './stores/params';
import { step, steps } from './stores/stepper';

export const newScenario = () => {
  let size, density, range;
  sizeParam.subscribe(v => (size = v[0]));
  densityParam.subscribe(v => (density = v[0]));
  rangeParam.subscribe(v => (range = v));

  const matrix = randomMatrixNew({
    size, density, range
  });

  step.set(0);
  steps.set(runPrimsAlgorithmNew(matrix));
}


export const keyboardNavigation = (steps, step, e: KeyboardEvent) => {
  if (e.shiftKey && e.key === 'ArrowLeft') {
    e.preventDefault();
    step > 2 ? (step -= 3) : (step = 0);
  }
  else if (e.shiftKey && e.key === 'ArrowRight') {
    e.preventDefault();
    step < (steps.length - 3) ? (step += 3) : (step = steps.length - 1);
  }
  else if (e.metaKey && e.key === 'ArrowLeft') {
    e.preventDefault();
    step = 0;
  }
  else if (e.metaKey && e.key === 'ArrowRight') {
    e.preventDefault();
    step = steps.length - 1;
  }
  else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    step > 0 && step--;
  }
  else if (e.key === 'ArrowRight') {
    e.preventDefault();
    step < (steps.length - 1) && step++
  }

  return step;
}