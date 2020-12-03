import { useCallback } from "react";
import { useGlobalState } from "@kundinos/react-hooks";

function useTheme(initialState) {
  const [theme, setTheme] = useGlobalState(initialState);

  const toggleTheme = useCallback(() => {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  }, [setTheme]);

  return [{ theme }, toggleTheme];
}

export default useTheme;
