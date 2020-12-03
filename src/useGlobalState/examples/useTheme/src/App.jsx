import React from "react";

import useTheme from "./useTheme";
import SwitcherTheme from "./SwitcherTheme";
import "./styles.css";

export default function App() {
  const [{ theme }] = useTheme("dark");

  return (
    <div className={`App App_theme_${theme}`}>
      <h1>useGlobalState</h1>
      <SwitcherTheme />
    </div>
  );
}
