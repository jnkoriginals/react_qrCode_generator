import React, { createContext, useEffect, useState, ReactNode } from "react";

type Theme = "auto" | "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "auto",
    setTheme: () => {},
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("auto");
    const [prefersDark, setPrefersDark] = useState<boolean>(false);

    const applyTheme = (chosenTheme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (chosenTheme === "auto") {
            root.classList.add(prefersDark ? "dark" : "light");
        } else {
            root.classList.add(chosenTheme);
        }
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    const toggleTheme = () => {
        const nextTheme: Theme =
            theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
        handleThemeChange(nextTheme);
    };

    useEffect(() => {
        const storedTheme = (localStorage.getItem("theme") as Theme) || "auto";
        setTheme(storedTheme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setPrefersDark(mediaQuery.matches);

        const handleMediaChange = (e: MediaQueryListEvent) =>
            setPrefersDark(e.matches);
        mediaQuery.addEventListener("change", handleMediaChange);

        return () =>
            mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, prefersDark]);

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme: handleThemeChange, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext };
