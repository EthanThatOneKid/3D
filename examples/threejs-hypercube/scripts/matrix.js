class Matrix {

  constructor(rows, cols) {
    this.rows;
    this.cols;
    this.data;
    if (typeof rows == "object" && !cols) {
      this.rows = rows.length;
      this.cols = rows[0].length;
      this.data = [];
      for (let r = 0; r < this.rows; r++) {
        let gimmeRow = [];
        for (let c = 0; c < this.cols; c++)
          gimmeRow.push(rows[r][c]);
        this.data.push(gimmeRow);
      }
    } else {
      this.rows = rows;
      this.cols = cols;
      this.data = [];
      for (let r = 0; r < this.rows; r++) {
        let gimmeRow = [];
        for (let c = 0; c < this.cols; c++)
          gimmeRow.push(0);
        this.data.push(gimmeRow);
      }
    }

  }

  log() {
    console.table(this.data);
  }

  mult(b) {
    if (this.cols != b.rows) {
      console.log("Columns of A must match rows of B.");
      return null;
    }
    let result = new Matrix(this.rows, b.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[j][k] * b.data[k][i];
        }
        result.data[j][i] = sum;
      }
    }
    return result;
  }

}
