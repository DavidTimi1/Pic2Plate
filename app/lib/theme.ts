const THEMES = ["light", "dark"];

export function getTheme() {
    let pref = localStorage.getItem("theme");
    if (!pref) {
        let prefLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        pref = prefLight ? "light" : "dark"
    }

    return pref;
}


export function initTheme(){
    const theme = getTheme();
    const root = document.querySelector(":root"), colorScheme = root?.querySelector("meta[name='color-scheme']");
    colorScheme?.setAttribute("content", theme);
    root?.classList.add(theme);
}


export function changeTheme(){
    const theme = getTheme();
    const newTheme = THEMES[THEMES.indexOf(theme) ? 0 : 1];

    const root = document.querySelector(":root"), colorScheme = root?.querySelector("meta[name='color-scheme']");
    colorScheme?.setAttribute("content", newTheme);
    root?.classList.remove(theme);
    root?.classList.add(newTheme);

    try {
        localStorage.setItem("theme", newTheme)
    } catch (err) {
        console.error(err)
    }

    return newTheme
}