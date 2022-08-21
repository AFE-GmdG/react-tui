import type Box from "../tui/box";
import type Screen from "../tui/screen";
import type Text from "../tui/text";

export type Type = "box";

export type Props = {};

export type Container = {
  screen: Screen;
  hostContext: HostContext;
};

export type HostContext = {};

export type Instance = Box;

export type TextInstance = Text;

export type UpdatePayload = any;
