const root = document.documentElement;
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function effectiveTheme(preference) {
  if (preference === "system") {
    return colorScheme.matches ? "dark" : "light";
  }
  return preference;
}

function applyTheme(preference) {
  const theme = effectiveTheme(preference);
  root.dataset.themePreference = preference;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const status = document.querySelector("#theme-status");
  if (status) {
    const source = preference === "system" ? " / SYSTEM" : "";
    status.textContent = `${theme.toUpperCase()} ACTIVE${source}`;
  }
}

// Light is explicit in the HTML so the default screenshot has no theme flash.
applyTheme(root.dataset.themePreference || "light");

document.addEventListener("DOMContentLoaded", () => {
  const controls = [...document.querySelectorAll('input[name="composite-theme"]')];

  controls.forEach((control) => {
    control.addEventListener("change", () => {
      if (control.checked) applyTheme(control.value);
    });
  });

  colorScheme.addEventListener("change", () => {
    if (root.dataset.themePreference === "system") {
      applyTheme("system");
    }
  });
});
