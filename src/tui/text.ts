import EventEmitter from "node:events";

import type Node from "./node";

import type Screen from "./screen";

class Text extends EventEmitter {
  #text: string;

  #screen: Screen;
  get screen(): Screen { return this.#screen; }

  parent: Node | null;

  detached: boolean;

  constructor(screen: Screen, text: string) {
    super({ captureRejections: true });
    this.#text = text;
    this.#screen = screen;
    this.parent = null;
    this.detached = true;
  }

  detach() {
    if (this.parent) {
      this.parent.remove(this);
    }
  }

  render() {
    console.log(`Render Text: ${this.#text}`);
  }
}

export default Text;
