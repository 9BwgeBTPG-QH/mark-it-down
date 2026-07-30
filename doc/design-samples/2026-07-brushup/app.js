const params = new URLSearchParams(window.location.search);
const root = document.documentElement;
const body = document.body;

const conditions = {
  language: params.get("lang") === "ja" ? "ja" : "en",
  viewport: params.get("viewport") === "mobile" ? "mobile" : "desktop",
  reducedMotion:
    params.get("motion") === "reduce" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  fallbackFonts: params.get("fonts") === "fallback",
};

const axisDefaults = {
  s1: "control",
  s2: "lora",
  s3a: "soft",
  s3b: "current",
  s3c: "cream",
  s4: "extension",
  s5a: "pill",
  s5b: "pill",
  s6a: "press",
  s6b: "system",
};

const axisOptions = {
  s1: ["control", "space", "jetbrains", "geist"],
  s2: ["lora", "space", "jetbrains", "geist"],
  s3a: ["soft", "hard"],
  s3b: ["current", "sharp"],
  s3c: ["cream", "grid"],
  s4: ["extension", "blue", "amber"],
  s5a: ["pill", "label"],
  s5b: ["pill", "angular"],
  s6a: ["press", "glow"],
  s6b: ["system", "segmented", "cycle"],
};

const fontFaces = [
  "MID Lora",
  "MID Raleway",
  "MID Space Mono",
  "MID JetBrains Mono",
  "MID Geist Mono",
];

const languageInputs = [...document.querySelectorAll('input[name="language"]')];
const viewportInputs = [...document.querySelectorAll('input[name="viewport"]')];
const reduceMotionInput = document.querySelector("#reduce-motion");
const forceFallbackInput = document.querySelector("#force-font-fallback");
const conditionReadout = document.querySelector("#condition-readout");
const fontHealth = document.querySelector("#font-health");
const replayButton = document.querySelector("#replay-motion");
const motionStatus = document.querySelector("#motion-status");
const themeStage = document.querySelector(".theme-ia-stage");
const themeInputs = [...document.querySelectorAll('input[name="preview-theme"]')];
const cycleThemeButton = document.querySelector("#cycle-theme");
const cycleThemeLabel = document.querySelector("#cycle-theme-label");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let themeChoice = "system";

function setRadioValue(name, value) {
  const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

function updateConditionReadout() {
  const motionLabel = conditions.reducedMotion ? "reduced motion" : "OS motion preference";
  const fontLabel = conditions.fallbackFonts ? "forced fallback" : "self-hosted fonts";
  conditionReadout.textContent =
    `${conditions.language.toUpperCase()} / ${conditions.viewport} / ${motionLabel} / ${fontLabel}`;
}

function applyLanguage(language) {
  conditions.language = language;
  root.lang = language;
  document.querySelectorAll(".js-copy").forEach((element) => {
    const nextCopy = element.dataset[language];
    if (typeof nextCopy === "string") element.textContent = nextCopy;
  });
  setRadioValue("language", language);
  updateConditionReadout();
}

function applyViewport(viewport) {
  conditions.viewport = viewport;
  body.dataset.previewSize = viewport;
  setRadioValue("viewport", viewport);
  updateConditionReadout();
}

function applyReducedMotion(reduced) {
  conditions.reducedMotion = reduced;
  body.dataset.motionReduced = String(reduced);
  reduceMotionInput.checked = reduced;
  updateConditionReadout();
}

function applyFontMode(fallback) {
  conditions.fallbackFonts = fallback;
  body.dataset.fontMode = fallback ? "fallback" : "self-hosted";
  forceFallbackInput.checked = fallback;
  fontHealth.textContent = fallback ? "Fallback forced" : "Checking fonts";
  updateConditionReadout();
  if (!fallback) checkFonts();
}

async function checkFonts() {
  if (!document.fonts) {
    fontHealth.textContent = "Font API unavailable";
    root.dataset.fontsReady = "unknown";
    return;
  }

  try {
    await Promise.all(fontFaces.map((face) => document.fonts.load(`400 16px "${face}"`, "MID v2.3.0")));
    const loaded = fontFaces.every((face) => document.fonts.check(`400 16px "${face}"`, "MID v2.3.0"));
    fontHealth.textContent = loaded ? "5/5 loaded" : "Font fallback active";
    root.dataset.fontsReady = loaded ? "true" : "false";
  } catch {
    fontHealth.textContent = "Font fallback active";
    root.dataset.fontsReady = "false";
  }
}

function applyAxisVariant(axis, variant) {
  if (!axisOptions[axis]?.includes(variant)) return;
  const experiment = document.querySelector(`[data-axis="${axis}"]`);
  if (!experiment) return;
  experiment.dataset.variant = variant;
  setRadioValue(axis, variant);

  if (axis === "s6a") {
    motionStatus.textContent =
      variant === "press"
        ? "Press grammar: 120 ms translation. Use Tab, Enter, touch, or Replay."
        : "Glow grammar: 220 ms shadow. Use Tab, Enter, touch, or Replay.";
  }

  if (axis === "s6b") {
    setThemeChoice("system");
  }
}

function effectiveTheme(choice) {
  if (choice === "system") return systemTheme.matches ? "dark" : "light";
  return choice;
}

function setThemeChoice(choice) {
  themeChoice = choice;
  const effective = effectiveTheme(choice);
  themeStage.dataset.effectiveTheme = effective;
  document.querySelectorAll(".js-effective-theme").forEach((element) => {
    element.textContent = effective[0].toUpperCase() + effective.slice(1);
  });
  document.querySelectorAll(".js-theme-choice").forEach((element) => {
    element.textContent = choice.toUpperCase();
  });
  setRadioValue("preview-theme", choice);
  cycleThemeLabel.textContent = choice[0].toUpperCase() + choice.slice(1);
  cycleThemeButton.setAttribute(
    "aria-label",
    `Theme: ${choice}. Activate to select ${nextThemeChoice(choice)}.`,
  );
}

function nextThemeChoice(choice) {
  if (choice === "system") return "light";
  if (choice === "light") return "dark";
  return "system";
}

function replayMotion() {
  const targets = [...document.querySelectorAll(".motion-target")];
  targets.forEach((target) => target.classList.remove("is-replaying"));
  void document.body.offsetWidth;
  targets.forEach((target) => target.classList.add("is-replaying"));

  if (conditions.reducedMotion) {
    motionStatus.textContent = "Reduced motion is active. State changed without movement.";
  } else {
    motionStatus.textContent = "Motion replaying on light and dark surfaces.";
  }

  window.setTimeout(() => {
    targets.forEach((target) => target.classList.remove("is-replaying"));
    motionStatus.textContent = conditions.reducedMotion
      ? "Reduced motion is active. Movement remains suppressed."
      : "Replay complete. Keyboard, pointer, and touch remain available.";
  }, conditions.reducedMotion ? 20 : 280);
}

function replayMotionTarget(target) {
  target.classList.remove("is-replaying");
  void target.offsetWidth;
  target.classList.add("is-replaying");

  window.setTimeout(() => {
    target.classList.remove("is-replaying");
  }, conditions.reducedMotion ? 20 : 280);
}

function configureCapture() {
  if (params.get("capture") !== "1") return;
  const axis = params.get("axis");
  const variant = params.get("variant");
  if (!axisOptions[axis]) return;

  body.dataset.capture = "true";
  document.querySelectorAll(".experiment").forEach((experiment) => {
    experiment.hidden = experiment.dataset.axis !== axis;
  });
  applyAxisVariant(axis, axisOptions[axis].includes(variant) ? variant : axisDefaults[axis]);
  document.title = `${axis}-${variant || axisDefaults[axis]}-${conditions.viewport}-${conditions.language}`;
}

document.querySelectorAll("[data-axis-control]").forEach((fieldset) => {
  fieldset.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    applyAxisVariant(fieldset.dataset.axisControl, input.value);
  });
});

languageInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) applyLanguage(input.value);
  });
});

viewportInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) applyViewport(input.value);
  });
});

reduceMotionInput.addEventListener("change", () => {
  applyReducedMotion(reduceMotionInput.checked);
});

forceFallbackInput.addEventListener("change", () => {
  applyFontMode(forceFallbackInput.checked);
});

themeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) setThemeChoice(input.value);
  });
});

cycleThemeButton.addEventListener("click", () => {
  setThemeChoice(nextThemeChoice(themeChoice));
});

replayButton.addEventListener("click", replayMotion);

document.querySelectorAll(".motion-target").forEach((target) => {
  target.addEventListener("click", () => replayMotionTarget(target));
});

systemTheme.addEventListener("change", () => {
  if (themeChoice === "system") setThemeChoice("system");
});

Object.entries(axisDefaults).forEach(([axis, defaultVariant]) => {
  applyAxisVariant(axis, defaultVariant);
});
applyLanguage(conditions.language);
applyViewport(conditions.viewport);
applyReducedMotion(conditions.reducedMotion);
applyFontMode(conditions.fallbackFonts);
setThemeChoice("system");
configureCapture();
