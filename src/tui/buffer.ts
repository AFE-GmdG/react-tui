import { Color } from "./colors";

type Attr = {
  fg?: Color;
  bg?: Color;
  bold?: boolean;
  underline?: boolean;
};

type Char = [string, Attr];

type Line = Char[];

class Buffer {
  #rows: number;
  get rows() { return this.#rows; }
  #columns: number;
  get columns() { return this.#columns; }

  #lines: Line[];

  constructor(rows: number, columns: number) {
    if (rows < 0 || columns < 0) {
      throw new Error("Invalid buffer size");
    }
    this.#rows = rows;
    this.#columns = columns;

    this.#lines = Array.from<unknown, Line>({ length: rows }, () => {
      return Array.from<unknown, Char>({ length: columns }, () => {
        return [" ", { fg: Color.White, bg: Color.Black }];
      });
    });
  }

  getLine(row: number): Readonly<Line> {
    if (row < 0 || row >= this.#rows) {
      throw new Error("Invalid row");
    }
    return this.#lines[row];
  }

  getLineUnsave(row: number): Readonly<Line> {
    return this.#lines[row];
  }

  getChar(row: number, column: number): Readonly<Char> {
    if (row < 0 || row >= this.#rows || column < 0 || column >= this.#columns) {
      throw new Error("Invalid position");
    }
    return this.#lines[row][column];
  }

  getCharUnsave(row: number, column: number): Readonly<Char> {
    return this.#lines[row][column];
  }

  getText(row: number, column: number, length: number): string {
    if (row < 0 || row >= this.#rows || column < 0 || column >= this.#columns) {
      throw new Error("Invalid position");
    }
    const line = this.#lines[row];
    const end = column + length;
    if (end > this.#columns) {
      throw new Error("Invalid length");
    }
    return line.slice(column, end).map(([c]) => c).join("");
  }
}

export default Buffer;
