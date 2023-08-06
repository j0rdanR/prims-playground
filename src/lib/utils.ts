export const killRow = (matrix, mY, selectionIndex?) => {
  matrix.forEach((_, mX) => {
    let type;
    if (mX === selectionIndex) type = 'selected';
    else type = 'deleted';

    if (typeof matrix[mX][mY] === 'number') {
      matrix[mX][mY] = { type, value: matrix[mX][mY] };
    }
  })

  return matrix;
}


export const smallestOfPointers = (matrix, pointers) => {
  let smallest = { value: null, x: null, y: null };

  pointers.forEach(pointerX => {
    const column = matrix[pointerX];
    const columnFiltered = matrix[pointerX].filter(v => {
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