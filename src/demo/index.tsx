import React from "react";

import { createRoot } from "../fiber";

import Screen from "../tui/screen";

type AppProps = {
  name: string;
};

const App: React.FC<AppProps> = ({
  name,
}) => (
  <box>
    {`Hello, ${name}!`}
  </box>
);

const screen = new Screen();
const root = createRoot(screen);
root.render(<App name="Andreas" />, () => {
  console.log("render complete");
});
