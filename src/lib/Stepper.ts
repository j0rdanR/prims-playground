

export default class Stepper {
  public matrix: (number|object)[][];
  public pointers: Array<number>;
  public selections: Array<number>;

  step: number;

  
  constructor(matrix) {
    this.matrix = matrix;
    this.pointers = [];
    this.selections = [];

    this.step = 1;
  }

  public next() {
    switch (this.step) {
      case 1: this.setStartingPoint(); break;
      case 2: this.killRow(0); break;
    
      default:
        console.log('Unknown step: ', this.step);
        break;
    }
    this.step++;
  }

  private setStartingPoint() {
    this.pointers.push(0);
  }

  private killRow(mY, selectionIndex?) {
    this.matrix.forEach((_, mX) => {
      let type;
      if (mX === selectionIndex) type = 'selected';
      else type = 'deleted';
  
      if (typeof this.matrix[mX][mY] === 'number') {
        this.matrix[mX][mY] = { type, value: this.matrix[mX][mY] };
      }
    })
  }
}