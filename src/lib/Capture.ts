
/** Captures the state of a matrix at a given point */
export default class Capture {
  public icon: string;
  public name: string;
  public matrix: Array<any[]>;
  private _matrix: string;
  public pointers: Array<number>;
  private _pointers: string;
  public selections: Array<number>;
  private _selections: string;
  
  constructor(icon, name, matrix, pointers, selections) {
    this.icon = icon;
    this.name = name;
    this._matrix = JSON.stringify(matrix);
    this._pointers = JSON.stringify(pointers);
    this._selections = JSON.stringify(selections);
  }

  public beforeRetrieve() {
    this.matrix = JSON.parse(this._matrix);
    this.pointers = JSON.parse(this._pointers);
    this.selections = JSON.parse(this._selections);
  }

  private clone(obj) {
    if (null == obj || 'object' != typeof obj) return obj;

    if (obj instanceof Date) {
      let copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    if (obj instanceof Array) {
      let copy = [];
      for (let i=0, len=obj.length; i<len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      var copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }
}