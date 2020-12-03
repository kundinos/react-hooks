import React from "react";

import useTheme from "./useTheme";

const textes = {
  dark: "Enable light",
  light: "Disable light"
};
export default function App() {
  const [{ theme }, toggleTheme] = useTheme();

  return <button onClick={toggleTheme}>{textes[theme]}</button>;
}
