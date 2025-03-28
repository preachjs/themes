import {
  getSystemTheme,
  getThemeFromStorage,
  onSystemThemeChange,
  setTheme as setPersonaTheme,
} from "@dumbjs/persona";
import { createContext, h } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

export type ThemeCtx = { theme: string; setTheme: (t: string) => void };

const Context = createContext<ThemeCtx>({ theme: "", setTheme() {} });

export const useTheme = () => {
  return useContext(Context);
};

type Options = "system" | "dark" | "light";

export const ThemeProvider = ({
  defaultTheme = "system",
  children,
  storageKey = "preach-themes",
}: {
  defaultTheme: Options;
  children: any;
  storageKey: string;
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  const setGlobalTheme = useCallback(
    (theme: string, store: boolean) =>
      setPersonaTheme(theme, {
        element: document.querySelector("html") as HTMLElement,
        storageKey: storageKey,
        store: store,
      }),
    [storageKey],
  );

  useEffect(() => {
    const storedTheme = getThemeFromStorage(storageKey) as Options;
    changeTheme(storedTheme ?? defaultTheme);

    onSystemThemeChange(() => {
      const storedTheme = getThemeFromStorage(storageKey) as Options;
      changeTheme(storedTheme);
    });
  }, []);

  const changeTheme = (theme: Options) => {
    if (theme === "system") {
      const systemTheme = getSystemTheme();
      setGlobalTheme("system", true);
      setGlobalTheme(systemTheme, false);
      setTheme("system");
      return;
    }
    setGlobalTheme(theme, true);
    setTheme(theme);
  };

  return (
    <Context.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </Context.Provider>
  );
};
