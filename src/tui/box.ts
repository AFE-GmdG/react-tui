import Node from "./node";
import Screen from "./screen";

import type { Props } from "../fiber/types";
import { hasLengthProperty } from "./validate";

export type BoxProps = Props & {
  width?: string | number;
  height?: string | number;
};

export const isBoxProps = (props: Props): props is BoxProps => {
  return props
    && (!("width" in props) || hasLengthProperty(props, "width"))
    && (!("height" in props) || hasLengthProperty(props, "height"));
};

class Box extends Node {
  #props: BoxProps;

  constructor(screen: Screen, props: BoxProps) {
    super(screen, "box");
    this.#props = props;
  }

  render() {
    console.log(`Render Box: ${this.#props.width || "(null)"}x${this.#props.height || "(null)"}`);
  }
}

export default Box;
