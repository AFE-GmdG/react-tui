import ansiEscapes from "ansi-escapes";

import Buffer from "./buffer";
import Node from "./node";
import Program, { ProgramOptions } from "./program";

import type { ResizeEventArgs } from "./types";
import type { TextInstance } from "../fiber/types";

class Screen extends Node {
  #program: Program;
  #debouncedRenderTimer: NodeJS.Timeout | null;

  #buffer: Buffer;

  constructor(programOptions?: ProgramOptions) {
    super(null as unknown as Screen, "screen");

    this.#program = new Program(programOptions);
    this.#program.on("resize", this.#handleResize);

    this.#debouncedRenderTimer = null;
    this.#buffer = new Buffer(this.#program.rows, this.#program.columns);
    this.render();
  }

  #handleResize = (event: ResizeEventArgs) => {
    this.#buffer = new Buffer(event.rows, event.columns);
    this.render();
    (function emitResizeRecursive(element: Node | TextInstance) {
      element.emit(event.type, event);
      if (element instanceof Node) {
        element.children.forEach(emitResizeRecursive);
      }
    })(this);
  };

  #draw(start: number, end: number) {
    // draw the #line buffer
    const output = this.#program.output;
    output.write(ansiEscapes.cursorSavePosition);
    output.write(ansiEscapes.cursorHide);

    for (let row = start; row < end; ++row) {
      output.write(ansiEscapes.cursorTo(0, row));
      for (let col = 0; col < this.#buffer.columns; ++col) {
        const [char, _attr] = this.#buffer.getChar(row, col);
        output.write(char);
      }
    }

    output.write(ansiEscapes.cursorRestorePosition);
    output.write(ansiEscapes.cursorShow);
  }

  override render() {
    this.children.forEach((child) => {
      child.render();
    });

    this.#draw(0, this.#buffer.rows - 1);

    this.emit("render", { type: "render" });
  }

  debouncedRender(delay: number = 16) {
    if (this.#debouncedRenderTimer !== null) {
      clearTimeout(this.#debouncedRenderTimer);
    }
    this.#debouncedRenderTimer = setTimeout(() => {
      this.render();
      this.#debouncedRenderTimer = null;
    }, delay);
  }
}

export default Screen;
