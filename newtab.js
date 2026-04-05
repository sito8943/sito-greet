// --- Simple i18n support (EN/ES) ---
const CURRENT_LANG = (navigator.language || "").toLowerCase().startsWith("es")
  ? "es"
  : "en";

// --- Constants ---
const MAX_PINNED_TABS = 4;
const HISTORY_MAX_RESULTS = 8;
const HISTORY_DAYS_BACK = 7;

// --- Feature Flags System ---
const FEATURE_FLAGS = {
  weather: {
    default: true,
    labelKey: "flagWeather",
    descKey: "flagWeatherDesc",
  },
  background_customization: {
    default: true,
    labelKey: "flagBackgroundCustomization",
    descKey: "flagBackgroundCustomizationDesc",
  },
  animations: {
    default: true,
    labelKey: "flagAnimations",
    descKey: "flagAnimationsDesc",
  },
  clock: { default: true, labelKey: "flagClock", descKey: "flagClockDesc" },
  profile_display: {
    default: true,
    labelKey: "flagProfileDisplay",
    descKey: "flagProfileDisplayDesc",
  },
  debug_mode: {
    default: false,
    labelKey: "flagDebugMode",
    descKey: "flagDebugModeDesc",
  },
  pinned_tabs: {
    default: true,
    labelKey: "flagPinnedTabs",
    descKey: "flagPinnedTabsDesc",
  },
  recent_history: {
    default: false,
    labelKey: "flagRecentHistory",
    descKey: "flagRecentHistoryDesc",
  },
};

const I18N = {
  en: {
    titleNewTab: "New Tab",
    settings: "Settings",
    whoAreYou: "Who are you?",
    whichProfile: "Which profile is this?",
    usernamePlaceholder: "Type your username here",
    profilePlaceholder: "Type profile name here",
    disableAnimations: "Disable animations",
    information: "Browser information",
    weather: "Weather",
    weatherEnabled: "Show weather on new tab",
    latitude: "Latitude",
    longitude: "Longitude",
    tempUnits: "Temperature units",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    apiBase: "Open-Meteo API base (optional)",
    save: "Save",
    cancel: "Cancel",
    madeBy: "Made by",
    profileLabel: "Profile",
    fetchingWeather: "Fetching weather…",
    setLocationToSeeWeather:
      "Set your location in Settings to see the weather.",
    weatherOff: "Weather took the day off.",
    weatherUnavailable: "Weather unavailable. Maybe it's shy.",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    bgMode: "Background Mode",
    defaultGradient: "Default gradient",
    solidColor: "Solid color",
    image: "Image",
    backgroundColor: "Background color",
    backgroundImage: "Background image",
    clearImage: "Clear image",
    overlayOpacity: "Image overlay",
    invalidCoordsUsingCurrent:
      "Invalid coordinates; using your current location.",
    invalidCoords: "Invalid coordinates.",
    // Feature flags dev panel
    devPanel: "Developer Panel",
    devPanelHint: "Ctrl+Shift+D to toggle",
    featureFlags: "Feature Flags",
    flagWeather: "Weather",
    flagWeatherDesc: "Weather widget on new tab",
    flagBackgroundCustomization: "Background Customization",
    flagBackgroundCustomizationDesc: "Background mode options in settings",
    flagAnimations: "Animations",
    flagAnimationsDesc: "Entrance and transition animations",
    flagClock: "Clock",
    flagClockDesc: "Date and time display",
    flagProfileDisplay: "Profile Display",
    flagProfileDisplayDesc: "Show profile name below greeting",
    flagDebugMode: "Debug Mode",
    flagDebugModeDesc: "Show debug info in console",
    flagsReset: "Reset all flags",
    flagsClose: "Close",
    flagEnabled: "ON",
    flagDisabled: "OFF",
    // Pinned Tabs
    flagPinnedTabs: "Pinned Tabs",
    flagPinnedTabsDesc: "Quick-access bookmarks on new tab",
    pinnedTabs: "Pinned Tabs",
    addPinnedTab: "Add pinned tab",
    pinnedTabUrl: "URL",
    pinnedTabLabel: "Label",
    pinnedTabUrlPlaceholder: "https://example.com",
    pinnedTabLabelPlaceholder: "My Site",
    pinnedTabAdd: "Add",
    pinnedTabRemove: "Remove",
    // Recent History
    flagRecentHistory: "Recent History",
    flagRecentHistoryDesc: `Show last ${HISTORY_MAX_RESULTS} visited sites`,
    recentHistory: "Recent",
    recentHistoryEmpty: "No recent history.",
    recentHistoryPermission: "Grant history permission to see recent sites.",
    recentHistoryGrantPermission: "Grant Permission",
  },
  es: {
    titleNewTab: "Nueva pestaña",
    settings: "Ajustes",
    whoAreYou: "¿Quién eres?",
    whichProfile: "¿Qué perfil es este?",
    usernamePlaceholder: "Escribe tu nombre de usuario",
    profilePlaceholder: "Escribe el nombre del perfil",
    disableAnimations: "Desactivar animaciones",
    information: "Información del navegador",
    weather: "Clima",
    weatherEnabled: "Mostrar el clima en nueva pestaña",
    latitude: "Latitud",
    longitude: "Longitud",
    tempUnits: "Unidades de temperatura",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    apiBase: "Base de la API Open-Meteo (opcional)",
    save: "Guardar",
    cancel: "Cancelar",
    madeBy: "Hecho por",
    profileLabel: "Perfil",
    fetchingWeather: "Obteniendo clima…",
    setLocationToSeeWeather:
      "Configura tu ubicación en Ajustes para ver el clima.",
    weatherOff: "El clima se tomó el día libre.",
    weatherUnavailable: "Clima no disponible. Quizás está tímido.",
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
    bgMode: "Tipo de fondo",
    defaultGradient: "Gradiente por defecto",
    solidColor: "Color sólido",
    image: "Imagen",
    backgroundColor: "Color de fondo",
    backgroundImage: "Imagen de fondo",
    clearImage: "Borrar imagen",
    overlayOpacity: "Oscurecer imagen",
    invalidCoordsUsingCurrent:
      "Coordenadas inválidas; usando tu ubicación actual.",
    invalidCoords: "Coordenadas inválidas.",
    // Feature flags dev panel
    devPanel: "Panel de Desarrollador",
    devPanelHint: "Ctrl+Shift+D para alternar",
    featureFlags: "Feature Flags",
    flagWeather: "Clima",
    flagWeatherDesc: "Widget de clima en nueva pestaña",
    flagBackgroundCustomization: "Personalización de Fondo",
    flagBackgroundCustomizationDesc: "Opciones de fondo en ajustes",
    flagAnimations: "Animaciones",
    flagAnimationsDesc: "Animaciones de entrada y transición",
    flagClock: "Reloj",
    flagClockDesc: "Visualización de fecha y hora",
    flagProfileDisplay: "Mostrar Perfil",
    flagProfileDisplayDesc: "Mostrar nombre de perfil bajo el saludo",
    flagDebugMode: "Modo Debug",
    flagDebugModeDesc: "Mostrar info de debug en consola",
    flagsReset: "Resetear flags",
    flagsClose: "Cerrar",
    flagEnabled: "ON",
    flagDisabled: "OFF",
    // Pinned Tabs
    flagPinnedTabs: "Pestañas Fijadas",
    flagPinnedTabsDesc: "Marcadores rápidos en nueva pestaña",
    pinnedTabs: "Pestañas Fijadas",
    addPinnedTab: "Agregar pestaña fijada",
    pinnedTabUrl: "URL",
    pinnedTabLabel: "Etiqueta",
    pinnedTabUrlPlaceholder: "https://ejemplo.com",
    pinnedTabLabelPlaceholder: "Mi Sitio",
    pinnedTabAdd: "Agregar",
    pinnedTabRemove: "Eliminar",
    // Recent History
    flagRecentHistory: "Historial Reciente",
    flagRecentHistoryDesc: `Mostrar últimos ${HISTORY_MAX_RESULTS} sitios visitados`,
    recentHistory: "Reciente",
    recentHistoryEmpty: "Sin historial reciente.",
    recentHistoryPermission:
      "Otorga permiso de historial para ver sitios recientes.",
    recentHistoryGrantPermission: "Otorgar Permiso",
  },
};

// In-memory cache populated on load
let _featureFlagsCache = null;

async function loadFeatureFlags() {
  const defaults = {};
  for (const [key, cfg] of Object.entries(FEATURE_FLAGS)) {
    defaults[key] = cfg.default;
  }

  let stored = {};
  const storageKey = "feature_flags";
  if (hasBrowserStorage()) {
    const result = await browser.storage.local.get(storageKey);
    if (result[storageKey]) stored = result[storageKey];
  } else if (typeof localStorage !== "undefined") {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) stored = JSON.parse(raw);
    } catch (_) {}
  }

  _featureFlagsCache = { ...defaults, ...stored };
  return _featureFlagsCache;
}

function isFeatureEnabled(flagName) {
  if (!_featureFlagsCache) {
    // Fallback before async load completes
    const cfg = FEATURE_FLAGS[flagName];
    return cfg ? cfg.default : false;
  }
  return Boolean(_featureFlagsCache[flagName]);
}

async function setFeatureFlag(flagName, enabled) {
  if (!FEATURE_FLAGS[flagName]) return;
  if (!_featureFlagsCache) await loadFeatureFlags();
  _featureFlagsCache[flagName] = Boolean(enabled);

  const storageKey = "feature_flags";
  if (hasBrowserStorage()) {
    await browser.storage.local.set({
      [storageKey]: { ..._featureFlagsCache },
    });
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(storageKey, JSON.stringify(_featureFlagsCache));
    } catch (_) {}
  }

  if (isFeatureEnabled("debug_mode")) {
    console.log(`[FeatureFlag] ${flagName} = ${enabled}`);
  }
}

async function resetFeatureFlags() {
  _featureFlagsCache = null;
  const storageKey = "feature_flags";
  if (hasBrowserStorage()) {
    await browser.storage.local.remove(storageKey);
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
  }
  await loadFeatureFlags();
}

// --- Pinned Tabs ---
async function getPinnedTabs() {
  const key = "pinned_tabs";
  if (hasBrowserStorage()) {
    const result = await browser.storage.local.get(key);
    return Array.isArray(result[key]) ? result[key] : [];
  } else if (typeof localStorage !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }
  return [];
}

async function savePinnedTabs(tabs) {
  const key = "pinned_tabs";
  if (hasBrowserStorage()) {
    await browser.storage.local.set({ [key]: tabs });
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(tabs));
    } catch (_) {}
  }
}

async function addPinnedTab(url, label) {
  if (!url || !label) return;
  try {
    new URL(url);
  } catch (_) {
    return;
  }
  const tabs = await getPinnedTabs();
  if (tabs.length >= MAX_PINNED_TABS) return;
  tabs.push({ url: url.trim(), label: label.trim() });
  await savePinnedTabs(tabs);
  renderPinnedTabs();
  renderPinnedTabsSettings();
}

async function removePinnedTab(index) {
  const tabs = await getPinnedTabs();
  if (index < 0 || index >= tabs.length) return;
  tabs.splice(index, 1);
  await savePinnedTabs(tabs);
  renderPinnedTabs();
  renderPinnedTabsSettings();
}

async function renderPinnedTabs() {
  const container = document.getElementById("pinned-tabs");
  if (!container) return;
  if (!isFeatureEnabled("pinned_tabs")) {
    container.style.display = "none";
    return;
  }
  container.style.display = "";
  const tabs = await getPinnedTabs();
  container.innerHTML = "";

  const heading = document.createElement("p");
  heading.className = "section-heading";
  heading.textContent = tr("pinnedTabs");
  container.appendChild(heading);

  for (const tab of tabs) {
    const a = document.createElement("a");
    a.href = tab.url;
    a.className = "pinned-tab-item";
    a.title = tab.url;
    a.rel = "noopener";

    const avatar = document.createElement("span");
    avatar.className = "pinned-tab-avatar";
    avatar.textContent = (tab.label || "?")[0].toUpperCase();

    const label = document.createElement("span");
    label.className = "pinned-tab-label";
    label.textContent = tab.label;

    a.appendChild(avatar);
    a.appendChild(label);
    container.appendChild(a);
  }

  // Fill remaining slots with placeholders
  const remaining = MAX_PINNED_TABS - tabs.length;
  for (let i = 0; i < remaining; i++) {
    const placeholder = document.createElement("button");
    placeholder.type = "button";
    placeholder.className = "pinned-tab-item pinned-tab-placeholder";
    placeholder.addEventListener("click", () => openAddPinnedDialog());

    const avatar = document.createElement("span");
    avatar.className = "pinned-tab-avatar pinned-tab-avatar-placeholder";
    avatar.textContent = "+";

    placeholder.appendChild(avatar);
    container.appendChild(placeholder);
  }
}

function openAddPinnedDialog() {
  const dialog = document.getElementById("dialog-add-pinned");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const urlEl = document.getElementById("dialog-pinned-url");
  const labelEl = document.getElementById("dialog-pinned-label");
  if (urlEl) urlEl.value = "";
  if (labelEl) labelEl.value = "";
  dialog.showModal();
}

async function renderPinnedTabsSettings() {
  const list = document.getElementById("pinned-tabs-list");
  if (!list) return;
  const tabs = await getPinnedTabs();
  list.innerHTML = "";
  for (let i = 0; i < tabs.length; i++) {
    const row = document.createElement("div");
    row.className = "pinned-tab-settings-row";

    const info = document.createElement("span");
    info.className = "pinned-tab-settings-info";
    info.textContent = `${tabs[i].label} — ${tabs[i].url}`;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "pinned-tab-remove-btn";
    removeBtn.textContent = "\u00d7";
    removeBtn.title = tr("pinnedTabRemove");
    removeBtn.addEventListener("click", () => removePinnedTab(i));

    row.appendChild(info);
    row.appendChild(removeBtn);
    list.appendChild(row);
  }
}

// --- Recent History ---
async function hasHistoryPermission() {
  try {
    if (typeof browser !== "undefined" && browser.permissions) {
      return await browser.permissions.contains({ permissions: ["history"] });
    }
  } catch (_) {}
  return false;
}

async function requestHistoryPermission() {
  try {
    if (typeof browser !== "undefined" && browser.permissions) {
      return await browser.permissions.request({ permissions: ["history"] });
    }
  } catch (_) {}
  return false;
}

async function renderRecentHistory() {
  const container = document.getElementById("recent-history");
  if (!container) return;
  if (!isFeatureEnabled("recent_history")) {
    container.style.display = "none";
    return;
  }
  container.style.display = "";
  container.innerHTML = "";

  const hasPermission = await hasHistoryPermission();
  if (!hasPermission) {
    const msg = document.createElement("p");
    msg.className = "recent-history-permission-msg";
    msg.textContent = tr("recentHistoryPermission");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "outlined button recent-history-grant-btn";
    btn.textContent = tr("recentHistoryGrantPermission");
    btn.addEventListener("click", async () => {
      const granted = await requestHistoryPermission();
      if (granted) renderRecentHistory();
    });
    container.appendChild(msg);
    container.appendChild(btn);
    return;
  }

  try {
    const results = await browser.history.search({
      text: "",
      maxResults: HISTORY_MAX_RESULTS,
      startTime: Date.now() - HISTORY_DAYS_BACK * 24 * 60 * 60 * 1000,
    });
    const filtered = (results || []).filter(
      (item) => item.url && item.url.startsWith("http"),
    );
    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.className = "recent-history-empty";
      empty.textContent = tr("recentHistoryEmpty");
      container.appendChild(empty);
      return;
    }
    const heading = document.createElement("p");
    heading.className = "section-heading";
    heading.textContent = tr("recentHistory");
    container.appendChild(heading);
    for (const item of filtered) {
      const a = document.createElement("a");
      a.href = item.url;
      a.className = "recent-history-item";
      a.title = item.url;
      a.rel = "noopener";

      const label = document.createElement("span");
      label.className = "recent-history-label";
      label.textContent = item.title || new URL(item.url).hostname;

      const host = document.createElement("span");
      host.className = "recent-history-host";
      try {
        host.textContent = new URL(item.url).hostname;
      } catch (_) {}

      a.appendChild(label);
      a.appendChild(host);
      container.appendChild(a);
    }
  } catch (err) {
    if (isFeatureEnabled("debug_mode")) {
      console.log("[Debug] History error:", err);
    }
  }
}

function tr(key) {
  return (I18N[CURRENT_LANG] && I18N[CURRENT_LANG][key]) || I18N.en[key] || key;
}

function applyI18n() {
  try {
    // Set document language attribute
    if (document && document.documentElement) {
      document.documentElement.setAttribute("lang", CURRENT_LANG);
    }
    document.title = tr("titleNewTab");
    const mapText = [
      ["i18n-settings-title", "settings"],
      ["i18n-who-are-you", "whoAreYou"],
      ["i18n-which-profile", "whichProfile"],
      ["i18n-disable-animations", "disableAnimations"],
      ["i18n-information-title", "information"],
      ["i18n-weather-title", "weather"],
      ["i18n-weather-enabled", "weatherEnabled"],
      ["i18n-label-lat", "latitude"],
      ["i18n-label-lon", "longitude"],
      ["i18n-label-temp-units", "tempUnits"],
      ["i18n-option-celsius", "celsius"],
      ["i18n-option-fahrenheit", "fahrenheit"],
      ["i18n-label-api-base", "apiBase"],
      ["i18n-save-button", "save"],
      ["cancel", "cancel"],
      ["i18n-made-by", "madeBy"],
      ["i18n-label-bg-mode", "bgMode"],
      ["i18n-option-bg-default", "defaultGradient"],
      ["i18n-option-bg-color", "solidColor"],
      ["i18n-option-bg-image", "image"],
      ["i18n-label-bg-color", "backgroundColor"],
      ["i18n-label-bg-image", "backgroundImage"],
      ["i18n-label-overlay-opacity", "overlayOpacity"],
      ["dev-panel-title", "devPanel"],
      ["dev-panel-hint", "devPanelHint"],
      ["dev-panel-flags-title", "featureFlags"],
      ["dev-panel-reset", "flagsReset"],
      ["i18n-pinned-tabs-title", "pinnedTabs"],
      ["i18n-pinned-tab-add", "pinnedTabAdd"],
      ["i18n-add-pinned-title", "addPinnedTab"],
      ["dialog-pinned-save", "pinnedTabAdd"],
      ["dialog-pinned-cancel", "cancel"],
    ];
    for (const [id, key] of mapText) {
      const el = document.getElementById(id);
      if (el) el.textContent = tr(key);
    }
    const usernameInput = document.getElementById("input-username");
    if (usernameInput) usernameInput.placeholder = tr("usernamePlaceholder");
    const profileInput = document.getElementById("input-profile");
    if (profileInput) profileInput.placeholder = tr("profilePlaceholder");
  } catch (_) {}
}

async function getBackgroundSettings() {
  let stored = {};
  if (hasBrowserStorage()) {
    stored = await browser.storage.local.get([
      "background_mode",
      "background_color",
      "background_image",
      "background_overlay_opacity",
    ]);
  } else if (typeof localStorage !== "undefined") {
    try {
      const mode = localStorage.getItem("background_mode");
      const color = localStorage.getItem("background_color");
      const image = localStorage.getItem("background_image");
      const overlay = localStorage.getItem("background_overlay_opacity");
      if (mode) stored.background_mode = mode;
      if (color) stored.background_color = color;
      if (image) stored.background_image = image;
      if (overlay !== null) stored.background_overlay_opacity = Number(overlay);
    } catch (_) {}
  }

  const modeEl = document.getElementById("input-background-mode");
  if (modeEl) modeEl.value = stored.background_mode || "default";
  const colorEl = document.getElementById("input-background-color");
  if (colorEl && stored.background_color)
    colorEl.value = stored.background_color;
  const overlayEl = document.getElementById("input-overlay-opacity");
  const overlayVal =
    typeof stored.background_overlay_opacity === "number"
      ? stored.background_overlay_opacity
      : 0;
  if (overlayEl) overlayEl.value = String(overlayVal);
  const overlayValueEl = document.getElementById("overlay-opacity-value");
  if (overlayValueEl) overlayValueEl.textContent = `${overlayVal}%`;

  return {
    mode: stored.background_mode || "default",
    color: stored.background_color || "#1b1b1b",
    image: stored.background_image || "",
    overlayOpacity: overlayVal,
  };
}

function applyBackground({ mode, color, image, overlayOpacity }) {
  try {
    const body = document.body;
    if (!body) return;
    body.dataset.bg = mode || "default";
    const overlay = document.getElementById("bg-overlay");
    if (mode === "color") {
      body.style.backgroundColor = color || "#1b1b1b";
      body.style.backgroundImage = "none";
      if (overlay) overlay.style.opacity = "0";
    } else if (mode === "image" && image) {
      body.style.backgroundImage = `url(${image})`;
      body.style.backgroundColor = "#000000";
      if (overlay) overlay.style.opacity = String((overlayOpacity || 0) / 100);
    } else {
      // Default gradient; rely on CSS
      body.style.backgroundImage = "";
      body.style.backgroundColor = "";
      if (overlay) overlay.style.opacity = "0";
    }
  } catch (_) {}
}

function getFormattedDateTime(date) {
  const now = date ? new Date(date) : new Date();

  const options = {
    weekday: "long", // martes
    day: "numeric", // 29
    month: "long", // julio
    year: "numeric", // 2025
    hour: "numeric", // 3
    minute: "2-digit", // 42
    hour12: true, // PM
  };

  return now.toLocaleString(navigator.language || "es-ES", options);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return tr("goodMorning");
  if (hour < 18) return tr("goodAfternoon");
  return tr("goodEvening");
}

function prefersReducedMotion() {
  try {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch (_) {
    return false;
  }
}

function hasBrowserStorage() {
  try {
    return (
      typeof browser !== "undefined" &&
      browser.storage &&
      browser.storage.local &&
      typeof browser.storage.local.get === "function"
    );
  } catch (_) {
    return false;
  }
}

async function getUserName() {
  let stored = {};
  if (hasBrowserStorage()) {
    stored = await browser.storage.local.get("username");
  } else if (typeof localStorage !== "undefined") {
    const v = localStorage.getItem("username");
    if (v) stored.username = v;
  }

  const usernameInput = document.getElementById("input-username");
  if (usernameInput) usernameInput.value = stored.username ?? "User";

  return stored.username || "User";
}

async function getProfileName() {
  let stored = {};
  if (hasBrowserStorage()) {
    stored = await browser.storage.local.get("profile_name");
  } else if (typeof localStorage !== "undefined") {
    const v = localStorage.getItem("profile_name");
    if (v) stored.profile_name = v;
  }

  const profileInput = document.getElementById("input-profile");
  if (profileInput)
    profileInput.value = stored.profile_name ?? "Default Profile";

  return stored.profile_name || "Default Profile";
}

async function getDisableAnimations() {
  let stored = {};
  if (hasBrowserStorage()) {
    stored = await browser.storage.local.get("disable_animations");
  } else if (typeof localStorage !== "undefined") {
    try {
      const v = localStorage.getItem("disable_animations");
      if (v !== null) stored.disable_animations = v === "true";
    } catch (_) {}
  }

  const checkbox = document.getElementById("input-disable-animations");
  if (checkbox) checkbox.checked = Boolean(stored.disable_animations);

  return Boolean(stored.disable_animations);
}

async function getWeatherSettings() {
  let stored = {};
  if (hasBrowserStorage()) {
    stored = await browser.storage.local.get([
      "weather_enabled",
      "weather_latitude",
      "weather_longitude",
      "weather_units",
      "weather_api_base",
    ]);
  } else if (typeof localStorage !== "undefined") {
    try {
      const enabled = localStorage.getItem("weather_enabled");
      const lat = localStorage.getItem("weather_latitude");
      const lon = localStorage.getItem("weather_longitude");
      const units = localStorage.getItem("weather_units");
      const api = localStorage.getItem("weather_api_base");
      if (enabled !== null) stored.weather_enabled = enabled === "true";
      if (lat !== null) stored.weather_latitude = parseFloat(lat);
      if (lon !== null) stored.weather_longitude = parseFloat(lon);
      if (units) stored.weather_units = units;
      if (api) stored.weather_api_base = api;
    } catch (_) {}
  }

  // Populate form inputs if present
  const enabledEl = document.getElementById("input-weather-enabled");
  if (enabledEl) enabledEl.checked = Boolean(stored.weather_enabled);
  const latEl = document.getElementById("input-weather-lat");
  if (latEl && isFiniteNumber(stored.weather_latitude))
    latEl.value = String(stored.weather_latitude);
  const lonEl = document.getElementById("input-weather-lon");
  if (lonEl && isFiniteNumber(stored.weather_longitude))
    lonEl.value = String(stored.weather_longitude);
  const unitsEl = document.getElementById("input-weather-units");
  if (unitsEl)
    unitsEl.value =
      stored.weather_units === "fahrenheit" ? "fahrenheit" : "celsius";
  const apiEl = document.getElementById("input-weather-api");
  if (apiEl && stored.weather_api_base) apiEl.value = stored.weather_api_base;

  return {
    enabled: Boolean(stored.weather_enabled),
    lat:
      typeof stored.weather_latitude === "number"
        ? stored.weather_latitude
        : undefined,
    lon:
      typeof stored.weather_longitude === "number"
        ? stored.weather_longitude
        : undefined,
    units: stored.weather_units === "fahrenheit" ? "fahrenheit" : "celsius",
    apiBase: stored.weather_api_base || "",
  };
}

function toDisplayTemp(t, units) {
  const unitChar = units === "fahrenheit" ? "°F" : "°C";
  return `${Math.round(t)}${unitChar}`;
}

function isFiniteNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}

function isValidLat(lat) {
  return isFiniteNumber(lat) && lat >= -90 && lat <= 90;
}

function isValidLon(lon) {
  return isFiniteNumber(lon) && lon >= -180 && lon <= 180;
}

function areValidLatLon(lat, lon) {
  return isValidLat(lat) && isValidLon(lon);
}

/**
 * Mensajes amigables y claros en español para el clima (basado en Open-Meteo weathercode)
 * Añade emojis y consejos breves según el clima, temperatura y viento.
 */
function weatherCodeToMessage(code, temp, wind, units) {
  const c = Number(code);
  const t = Number(temp);
  const w = Number(wind);

  let base = "";
  const isEs = CURRENT_LANG === "es";
  switch (c) {
    case 0:
      base = isEs
        ? "Cielo despejado ☀️. Día ideal para salir."
        : "Clear sky ☀️. Perfect day to go out.";
      break;
    case 1:
      base = isEs
        ? "Mayormente despejado 🌤️. Unas pocas nubes aquí y allá."
        : "Mostly clear 🌤️. A few clouds around.";
      break;
    case 2:
      base = isEs
        ? "Parcialmente nublado ⛅. Tal vez salga el sol luego."
        : "Partly cloudy ⛅. Sun may pop out later.";
      break;
    case 3:
      base = isEs
        ? "Cielo nublado ☁️. Día algo gris, pero tranquilo."
        : "Overcast ☁️. A bit gray, but calm.";
      break;
    case 45:
    case 48:
      base = isEs
        ? "Niebla 🌫️. Maneja con precaución."
        : "Fog 🌫️. Drive carefully.";
      break;
    case 51:
      base = isEs
        ? "Llovizna ligera 🌦️. Lleva paraguas por si acaso ☂️."
        : "Light drizzle 🌦️. Bring an umbrella just in case ☂️.";
      break;
    case 53:
      base = isEs
        ? "Llovizna moderada 🌧️. Mejor tener paraguas a mano ☔."
        : "Moderate drizzle 🌧️. Keep an umbrella handy ☔.";
      break;
    case 55:
      base = isEs
        ? "Llovizna intensa 🌧️. Ideal para quedarse en casa con café ☕."
        : "Heavy drizzle 🌧️. Cozy coffee weather ☕.";
      break;
    case 56:
    case 57:
      base = isEs
        ? "Llovizna helada ❄️. Cuidado con superficies resbaladizas."
        : "Freezing drizzle ❄️. Watch for slippery surfaces.";
      break;
    case 61:
      base = isEs
        ? "Lluvia ligera 🌦️. Un paraguas podría ser buena idea ☂️."
        : "Light rain 🌦️. An umbrella might help ☂️.";
      break;
    case 63:
      base = isEs
        ? "Lluvia moderada 🌧️. Evita mojarte sin abrigo."
        : "Moderate rain 🌧️. Stay dry out there.";
      break;
    case 65:
      base = isEs
        ? "Lluvia intensa ⛈️. Mejor evitar salir sin necesidad."
        : "Heavy rain ⛈️. Best to avoid going out.";
      break;
    case 66:
    case 67:
      base = isEs
        ? "Lluvia helada ❄️. Abrígate y camina con cuidado."
        : "Freezing rain ❄️. Bundle up and walk carefully.";
      break;
    case 71:
      base = isEs
        ? "Nieve ligera 🌨️. Puede verse bonito afuera."
        : "Light snow 🌨️. Looks pretty outside.";
      break;
    case 73:
      base = isEs
        ? "Nieve moderada ❄️. Abrígate bien."
        : "Moderate snow ❄️. Dress warm.";
      break;
    case 75:
      base = isEs
        ? "Nieve intensa 🌨️❄️. Mejor permanecer en interiores."
        : "Heavy snow 🌨️❄️. Better stay indoors.";
      break;
    case 77:
      base = isEs ? "Caen granitos de nieve 🌨️." : "Snow grains falling 🌨️.";
      break;
    case 80:
      base = isEs
        ? "Chubascos débiles 🌦️. Tal vez llueva un poco."
        : "Light showers 🌦️. Might rain a bit.";
      break;
    case 81:
      base = isEs
        ? "Chubascos moderados 🌧️. Lleva paraguas por si acaso ☂️."
        : "Moderate showers 🌧️. Umbrella could help ☂️.";
      break;
    case 82:
      base = isEs
        ? "Chubascos fuertes ⛈️. Mejor tener paraguas o capucha."
        : "Heavy showers ⛈️. Umbrella or hood recommended.";
      break;
    case 85:
      base = isEs
        ? "Chubascos de nieve 🌨️. Puede acumularse en el suelo."
        : "Snow showers 🌨️. Might accumulate on the ground.";
      break;
    case 86:
      base = isEs
        ? "Chubascos de nieve intensos ❄️. Precaución al salir."
        : "Heavy snow showers ❄️. Use caution.";
      break;
    case 95:
      base = isEs
        ? "Tormenta eléctrica ⚡. Quédate bajo techo si puedes."
        : "Thunderstorm ⚡. Stay indoors if you can.";
      break;
    case 96:
    case 99:
      base = isEs
        ? "Tormenta con granizo ⛈️. Evita salir por seguridad."
        : "Hailstorm ⛈️. Best to stay inside.";
      break;
    default:
      base = isEs ? "Clima no identificado 🤔." : "Weather not identified 🤔.";
  }

  // Extras according to temperature and wind
  const extras = [];
  if (!Number.isNaN(w) && w >= 35)
    extras.push(isEs ? "Hace bastante viento 💨." : "Quite windy 💨.");
  if (!Number.isNaN(t)) {
    const hot = units === "fahrenheit" ? t >= 86 : t >= 30;
    const cold = units === "fahrenheit" ? t <= 32 : t <= 0;
    if (hot)
      extras.push(
        isEs ? "Hace calor 🥵, hidrátate bien." : "It's hot 🥵, stay hydrated.",
      );
    else if (cold)
      extras.push(
        isEs ? "Hace frío 🧣, abrígate bien." : "It's cold 🧣, dress warm.",
      );
  }

  return [base, ...extras].join(" ");
}

async function fetchOpenMeteo({ lat, lon, units, apiBase }) {
  const base =
    apiBase && apiBase.trim().length
      ? apiBase.trim()
      : "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current_weather: "true",
    temperature_unit: units === "fahrenheit" ? "fahrenheit" : "celsius",
    windspeed_unit: "kmh",
  });
  const url = `${base}?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Open-Meteo error ${res.status}`);
  return res.json();
}

async function getCoordsPreferGeolocation(storedLat, storedLon) {
  if (typeof storedLat === "number" && typeof storedLon === "number") {
    return { lat: storedLat, lon: storedLon };
  }
  if (typeof navigator !== "undefined" && navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 4000,
          maximumAge: 5 * 60 * 1000,
        });
      });
      if (pos && pos.coords) {
        return { lat: pos.coords.latitude, lon: pos.coords.longitude };
      }
    } catch (_) {}
  }
  return undefined;
}

async function renderWeather() {
  const el = document.getElementById("weather");
  if (!el) return;
  if (!isFeatureEnabled("weather")) {
    el.textContent = "";
    return;
  }
  try {
    const settings = await getWeatherSettings();
    if (!settings.enabled) {
      el.textContent = "";
      return;
    }

    const userProvided =
      typeof settings.lat === "number" || typeof settings.lon === "number";
    const userLatLonValid = areValidLatLon(settings.lat, settings.lon);

    let usedGeoDueToInvalid = false;
    let coords;
    if (userLatLonValid) {
      coords = { lat: settings.lat, lon: settings.lon };
    } else {
      // If invalid or missing, try geolocation
      coords = await getCoordsPreferGeolocation(undefined, undefined);
      usedGeoDueToInvalid = Boolean(userProvided && !userLatLonValid && coords);
    }
    if (!coords) {
      // Mention invalid if user provided something but it was invalid
      el.textContent =
        userProvided && !userLatLonValid
          ? `${tr("invalidCoords")} ${tr("setLocationToSeeWeather")}`
          : tr("setLocationToSeeWeather");
      return;
    }
    el.textContent = tr("fetchingWeather");
    const data = await fetchOpenMeteo({
      lat: coords.lat,
      lon: coords.lon,
      units: settings.units,
      apiBase: settings.apiBase,
    });
    const cw = data && data.current_weather;
    if (!cw) {
      el.textContent = tr("weatherOff");
      return;
    }

    const tempTxt = toDisplayTemp(cw.temperature, settings.units);
    const msg = weatherCodeToMessage(
      cw.weathercode,
      cw.temperature,
      cw.windspeed,
      settings.units,
    );
    const icon = (() => {
      const c = Number(cw.weathercode);
      if (c === 0) return "☀️";
      if ([1, 2, 3].includes(c)) return "⛅";
      if ([45, 48].includes(c)) return "🌫️";
      if ([51, 53, 55, 56, 57].includes(c)) return "🌦️";
      if ([61, 63, 65, 66, 67, 80, 81, 82].includes(c)) return "🌧️";
      if ([71, 73, 75, 77, 85, 86].includes(c)) return "❄️";
      if ([95, 96, 99].includes(c)) return "⛈️";
      return "🌍";
    })();
    const prefix = usedGeoDueToInvalid
      ? `${tr("invalidCoordsUsingCurrent")} `
      : "";
    el.textContent = `${prefix}${icon} ${tempTxt} — ${msg}`;
  } catch (err) {
    const el = document.getElementById("weather");
    if (el) el.textContent = tr("weatherUnavailable");
  }
}

function openDialog() {
  const dialog = document.getElementById("dialog-settings");
  if (dialog && typeof dialog.showModal === "function") {
    renderPinnedTabsSettings();
    dialog.showModal();
  }
}

function closeDialog() {
  const dialog = document.getElementById("dialog-settings");
  if (dialog && typeof dialog.close === "function") dialog.close();
}

async function updateSettings(e) {
  // If form method is dialog, let it close; but handle async reads first
  const usernameEl = document.getElementById("input-username");
  const profileEl = document.getElementById("input-profile");
  const disableAnimationsEl = document.getElementById(
    "input-disable-animations",
  );
  const weatherEnabledEl = document.getElementById("input-weather-enabled");
  const weatherLatEl = document.getElementById("input-weather-lat");
  const weatherLonEl = document.getElementById("input-weather-lon");
  const weatherUnitsEl = document.getElementById("input-weather-units");
  const weatherApiEl = document.getElementById("input-weather-api");
  const username = (usernameEl && usernameEl.value) || "User";
  const profile_name = (profileEl && profileEl.value) || "Default Profile";
  const disable_animations = Boolean(
    disableAnimationsEl && disableAnimationsEl.checked,
  );
  const weather_enabled = Boolean(weatherEnabledEl && weatherEnabledEl.checked);
  const weather_latitude =
    weatherLatEl && weatherLatEl.value !== ""
      ? Number(weatherLatEl.value)
      : undefined;
  const weather_longitude =
    weatherLonEl && weatherLonEl.value !== ""
      ? Number(weatherLonEl.value)
      : undefined;
  const weather_units =
    weatherUnitsEl && weatherUnitsEl.value === "fahrenheit"
      ? "fahrenheit"
      : "celsius";
  const weather_api_base =
    (weatherApiEl && weatherApiEl.value && weatherApiEl.value.trim()) || "";

  // Background controls
  const bgModeEl = document.getElementById("input-background-mode");
  const bgColorEl = document.getElementById("input-background-color");
  const bgImageEl = document.getElementById("input-background-image");
  const bgOverlayEl = document.getElementById("input-overlay-opacity");
  const background_mode = (bgModeEl && bgModeEl.value) || "default";
  const background_color = (bgColorEl && bgColorEl.value) || "#1b1b1b";
  const background_overlay_opacity = bgOverlayEl
    ? Number(bgOverlayEl.value)
    : 0;

  // Read any newly selected image file; otherwise keep existing stored one
  let background_image = "";
  try {
    const current = await (hasBrowserStorage()
      ? browser.storage.local.get("background_image")
      : Promise.resolve({
          background_image:
            typeof localStorage !== "undefined"
              ? localStorage.getItem("background_image")
              : "",
        }));
    background_image = (current && current.background_image) || "";
  } catch (_) {}
  if (bgImageEl && bgImageEl.files && bgImageEl.files[0]) {
    background_image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => resolve("");
      reader.readAsDataURL(bgImageEl.files[0]);
    });
  }

  const greeting = getGreeting();

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.textContent = `${greeting}, ${username}!`;
  const profileTextEl = document.getElementById("profile");
  if (profileTextEl)
    profileTextEl.textContent = `${tr("profileLabel")}: ${profile_name}`;
  if (hasBrowserStorage()) {
    const toSet = {
      username,
      profile_name,
      disable_animations,
      weather_enabled,
      weather_units,
      weather_api_base,
      background_mode,
      background_color,
      background_overlay_opacity,
    };

    if (background_mode === "image") toSet.background_image = background_image;
    if (
      typeof weather_latitude === "number" ||
      typeof weather_latitude === "undefined"
    )
      toSet.weather_latitude = weather_latitude;
    if (
      typeof weather_longitude === "number" ||
      typeof weather_longitude === "undefined"
    )
      toSet.weather_longitude = weather_longitude;

    await browser.storage.local.set(toSet);
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem("username", username);
      localStorage.setItem("profile_name", profile_name);
      localStorage.setItem("disable_animations", String(disable_animations));
      localStorage.setItem("weather_enabled", String(weather_enabled));
      if (typeof weather_latitude === "number")
        localStorage.setItem("weather_latitude", String(weather_latitude));
      if (typeof weather_longitude === "number")
        localStorage.setItem("weather_longitude", String(weather_longitude));
      localStorage.setItem("weather_units", weather_units);
      localStorage.setItem("weather_api_base", weather_api_base);
      localStorage.setItem("background_mode", background_mode);
      localStorage.setItem("background_color", background_color);
      localStorage.setItem(
        "background_overlay_opacity",
        String(background_overlay_opacity),
      );
      if (background_mode === "image" && background_image)
        localStorage.setItem("background_image", background_image);
    } catch (_) {}
  }

  // Reflect setting to CSS via root data attribute
  const root = document.documentElement;
  if (root) {
    if (disable_animations) root.setAttribute("data-animations", "off");
    else root.removeAttribute("data-animations");
  }

  // Re-render weather in case settings changed
  renderWeather();

  // Apply background after saving
  applyBackground({
    mode: background_mode,
    color: background_color,
    image: background_image,
    overlayOpacity: background_overlay_opacity,
  });
}

{
  const clock = document.getElementById("clock");
  if (clock) clock.textContent = getFormattedDateTime();
}

// --- Developer Panel ---
function buildDevPanel() {
  const panel = document.getElementById("dev-panel");
  if (!panel) return;
  const list = document.getElementById("dev-flags-list");
  if (!list) return;
  list.innerHTML = "";

  for (const [flagName, cfg] of Object.entries(FEATURE_FLAGS)) {
    const enabled = isFeatureEnabled(flagName);
    const row = document.createElement("div");
    row.className = "dev-flag-row";

    const info = document.createElement("div");
    info.className = "dev-flag-info";
    const label = document.createElement("span");
    label.className = "dev-flag-label";
    label.textContent = tr(cfg.labelKey);
    const desc = document.createElement("span");
    desc.className = "dev-flag-desc";
    desc.textContent = tr(cfg.descKey);
    info.appendChild(label);
    info.appendChild(desc);

    const toggle = document.createElement("label");
    toggle.className = "switch dev-flag-switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = enabled;
    input.addEventListener("change", async () => {
      if (flagName === "recent_history" && input.checked) {
        const granted = await requestHistoryPermission();
        if (!granted) {
          input.checked = false;
          return;
        }
      }
      await setFeatureFlag(flagName, input.checked);
      applyFeatureFlags();
    });
    const slider = document.createElement("span");
    slider.className = "slider round";
    toggle.appendChild(input);
    toggle.appendChild(slider);

    row.appendChild(info);
    row.appendChild(toggle);
    list.appendChild(row);
  }
}

function toggleDevPanel() {
  const panel = document.getElementById("dev-panel");
  if (!panel) return;
  const isOpen = panel.classList.contains("open");
  if (isOpen) {
    panel.classList.remove("open");
  } else {
    buildDevPanel();
    panel.classList.add("open");
  }
}

async function applyFeatureFlags() {
  // Clock
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.style.display = isFeatureEnabled("clock") ? "" : "none";

  // Profile
  const profileEl = document.getElementById("profile");
  if (profileEl)
    profileEl.style.display = isFeatureEnabled("profile_display") ? "" : "none";

  // Weather
  const weatherEl = document.getElementById("weather");
  if (weatherEl) {
    if (isFeatureEnabled("weather")) {
      weatherEl.style.display = "";
      renderWeather();
    } else {
      weatherEl.style.display = "none";
    }
  }

  // Animations
  const root = document.documentElement;
  if (!isFeatureEnabled("animations")) {
    root.setAttribute("data-animations", "off");
  } else {
    const disableAnimations = await getDisableAnimations();
    const reducedMotion = prefersReducedMotion() || disableAnimations;
    if (reducedMotion) root.setAttribute("data-animations", "off");
    else root.removeAttribute("data-animations");
  }

  // Background customization — hide settings section controls
  const bgSection = document.getElementById("bg-customization-section");
  if (bgSection)
    bgSection.style.display = isFeatureEnabled("background_customization")
      ? ""
      : "none";

  // Weather settings section
  const weatherSection = document.getElementById("weather-settings-section");
  if (weatherSection)
    weatherSection.style.display = isFeatureEnabled("weather") ? "" : "none";

  // Pinned Tabs
  const pinnedTabsEl = document.getElementById("pinned-tabs");
  if (pinnedTabsEl) {
    if (isFeatureEnabled("pinned_tabs")) {
      pinnedTabsEl.style.display = "";
      renderPinnedTabs();
    } else {
      pinnedTabsEl.style.display = "none";
    }
  }
  const pinnedTabsSection = document.getElementById(
    "pinned-tabs-settings-section",
  );
  if (pinnedTabsSection)
    pinnedTabsSection.style.display = isFeatureEnabled("pinned_tabs")
      ? ""
      : "none";

  // Recent History
  const recentHistoryEl = document.getElementById("recent-history");
  if (recentHistoryEl) {
    if (isFeatureEnabled("recent_history")) {
      recentHistoryEl.style.display = "";
      renderRecentHistory();
    } else {
      recentHistoryEl.style.display = "none";
    }
  }

  // Debug mode
  if (isFeatureEnabled("debug_mode")) {
    console.log("[Debug] Feature flags:", { ..._featureFlagsCache });
    console.log("[Debug] Lang:", CURRENT_LANG);
    console.log(
      "[Debug] Storage:",
      hasBrowserStorage() ? "browser.storage" : "localStorage",
    );
  }
}

// --- Expand/Collapse ---
let _expanded = false;

function syncExpandedState() {
  const main = document.querySelector("main");
  if (main) main.classList.toggle("expanded", _expanded);

  const headerProfile = document.getElementById("header-profile");
  if (headerProfile) {
    if (_expanded) {
      const profileEl = document.getElementById("profile");
      headerProfile.textContent = profileEl ? profileEl.textContent : "";
      headerProfile.classList.add("show");
    } else {
      headerProfile.classList.remove("show");
    }
  }
}

function goDown() {
  if (_expanded) return;
  _expanded = true;
  syncExpandedState();
}

function goUp() {
  if (!_expanded) return;
  _expanded = false;
  syncExpandedState();
}

(async () => {
  // Load feature flags before anything else
  await loadFeatureFlags();

  // Apply i18n labels/placeholders ASAP
  applyI18n();
  const disableAnimations = await getDisableAnimations();
  const animationsEnabled = isFeatureEnabled("animations");
  const reducedMotion =
    !animationsEnabled || prefersReducedMotion() || disableAnimations;
  const greeting = getGreeting();
  const username = await getUserName();
  const profileName = await getProfileName();

  // Expose to CSS via root data attribute for animation control
  const root = document.documentElement;
  if (root) {
    if (reducedMotion) root.setAttribute("data-animations", "off");
    else root.removeAttribute("data-animations");
  }

  // Clock feature
  if (isFeatureEnabled("clock")) {
    setInterval(() => {
      const clock = document.getElementById("clock");
      if (clock) clock.textContent = getFormattedDateTime();
    }, 1000);
  } else {
    const clockEl = document.getElementById("clock");
    if (clockEl) clockEl.style.display = "none";
  }

  const settingsBtn = document.getElementById("settings-button");
  if (settingsBtn) settingsBtn.addEventListener("click", openDialog);
  const expandBtn = document.getElementById("expand-btn");
  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      if (_expanded) goUp();
      else goDown();
    });
  }
  const cancelBtn = document.getElementById("cancel");
  if (cancelBtn) cancelBtn.addEventListener("click", closeDialog);
  const form = document.getElementById("form-settings");
  if (form) form.addEventListener("submit", updateSettings);
  // Background controls visibility + clear image
  const modeEl = document.getElementById("input-background-mode");
  const colorEl = document.getElementById("input-background-color");
  const colorLabel = document.getElementById("i18n-label-bg-color");
  const fileEl = document.getElementById("input-background-image");
  const fileLabel = document.getElementById("i18n-label-bg-image");
  const clearBtn = document.getElementById("btn-clear-bg-image");
  const overlayLabel = document.getElementById("i18n-label-overlay-opacity");
  const overlayRow = document.querySelector(".overlay-slider-row");
  const overlayInput = document.getElementById("input-overlay-opacity");
  const overlayValueDisplay = document.getElementById("overlay-opacity-value");
  const refreshVisibility = () => {
    const mode = modeEl ? modeEl.value : "default";
    if (colorEl) colorEl.style.display = mode === "color" ? "block" : "none";
    if (colorLabel)
      colorLabel.style.display = mode === "color" ? "block" : "none";
    const showImage = mode === "image";
    if (fileEl) {
      fileEl.style.display = showImage ? "block" : "none";
      if (fileLabel) fileLabel.style.display = showImage ? "block" : "none";
      if (clearBtn)
        clearBtn.style.display = showImage ? "inline-block" : "none";
    }
    if (overlayLabel) overlayLabel.style.display = showImage ? "block" : "none";
    if (overlayRow) overlayRow.style.display = showImage ? "flex" : "none";
  };
  if (overlayInput) {
    overlayInput.addEventListener("input", () => {
      if (overlayValueDisplay)
        overlayValueDisplay.textContent = `${overlayInput.value}%`;
      const overlay = document.getElementById("bg-overlay");
      if (overlay)
        overlay.style.opacity = String(Number(overlayInput.value) / 100);
    });
  }
  if (modeEl) modeEl.addEventListener("change", refreshVisibility);
  if (clearBtn)
    clearBtn.addEventListener("click", async () => {
      try {
        if (hasBrowserStorage())
          await browser.storage.local.remove(["background_image"]);
        else if (typeof localStorage !== "undefined")
          localStorage.removeItem("background_image");
      } catch (_) {}
      if (fileEl) fileEl.value = "";
    });
  const greetingElInit = document.getElementById("greeting");
  if (greetingElInit) greetingElInit.textContent = `${greeting}, ${username}!`;
  const profileInit = document.getElementById("profile");
  if (profileInit) {
    if (isFeatureEnabled("profile_display")) {
      profileInit.textContent = `${tr("profileLabel")}: ${profileName}`;
    } else {
      profileInit.style.display = "none";
    }
  }

  // Trigger entrance animations for greeting and profile
  const greetingEl = document.getElementById("greeting");
  const profileEl = document.getElementById("profile");
  if (!reducedMotion) {
    if (greetingEl) greetingEl.classList.add("fancy-appear");
    if (profileEl && isFeatureEnabled("profile_display"))
      profileEl.classList.add("fancy-appear");
  }

  // Wait until both animations finish, then fade in clock and footer
  const animTargets = [greetingEl, profileEl].filter(Boolean);
  if (!reducedMotion && animTargets.length) {
    await Promise.all(
      animTargets.map(
        (el) =>
          new Promise((resolve) => {
            let resolved = false;
            const done = () => {
              if (resolved) return;
              resolved = true;
              el.removeEventListener("animationend", done);
              resolve();
            };
            el.addEventListener("animationend", done, { once: true });
            setTimeout(done, 800);
          }),
      ),
    );
  }

  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.classList.add("show");
  const footer = document.querySelector("footer");
  if (footer) footer.classList.add("show");

  // Weather after entrance
  renderWeather();

  // Background: load and apply
  const bg = await getBackgroundSettings();
  applyBackground(bg);
  // Ensure proper field visibility after load
  (function ensureBgUI() {
    const modeEl = document.getElementById("input-background-mode");
    if (modeEl) {
      modeEl.value = bg.mode || "default";
      const colorEl = document.getElementById("input-background-color");
      if (colorEl && bg.color) colorEl.value = bg.color;
    }
    const ev = new Event("change");
    if (modeEl) modeEl.dispatchEvent(ev);
  })();

  // Hide background customization section if flag is off
  const bgSection = document.getElementById("bg-customization-section");
  if (bgSection && !isFeatureEnabled("background_customization"))
    bgSection.style.display = "none";

  // Hide weather settings section if flag is off
  const weatherSection = document.getElementById("weather-settings-section");
  if (weatherSection && !isFeatureEnabled("weather"))
    weatherSection.style.display = "none";

  // Pinned tabs: settings list (applyFeatureFlags handles the main render)
  if (isFeatureEnabled("pinned_tabs")) {
    renderPinnedTabsSettings();
  }
  const pinnedTabsSection = document.getElementById(
    "pinned-tabs-settings-section",
  );
  if (pinnedTabsSection && !isFeatureEnabled("pinned_tabs"))
    pinnedTabsSection.style.display = "none";

  const addPinnedBtn = document.getElementById("btn-add-pinned-tab");
  if (addPinnedBtn) {
    addPinnedBtn.addEventListener("click", async () => {
      const urlEl = document.getElementById("input-pinned-url");
      const labelEl = document.getElementById("input-pinned-label");
      const url = urlEl ? urlEl.value.trim() : "";
      const label = labelEl ? labelEl.value.trim() : "";
      if (url && label) {
        await addPinnedTab(url, label);
        if (urlEl) urlEl.value = "";
        if (labelEl) labelEl.value = "";
      }
    });
  }

  // Add pinned tab mini dialog buttons
  const dialogPinnedSave = document.getElementById("dialog-pinned-save");
  const dialogPinnedCancel = document.getElementById("dialog-pinned-cancel");
  const dialogAddPinned = document.getElementById("dialog-add-pinned");
  if (dialogPinnedSave) {
    dialogPinnedSave.addEventListener("click", async () => {
      const urlEl = document.getElementById("dialog-pinned-url");
      const labelEl = document.getElementById("dialog-pinned-label");
      const url = urlEl ? urlEl.value.trim() : "";
      const label = labelEl ? labelEl.value.trim() : "";
      if (url && label) {
        await addPinnedTab(url, label);
        if (dialogAddPinned) dialogAddPinned.close();
      }
    });
  }
  if (dialogPinnedCancel) {
    dialogPinnedCancel.addEventListener("click", () => {
      if (dialogAddPinned) dialogAddPinned.close();
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ignore if a dialog is open or user is typing in an input
    const active = document.activeElement;
    const isTyping =
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT");
    if (isTyping) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      goDown();
    }
    if (e.key === "ArrowUp" && _expanded) {
      e.preventDefault();
      goUp();
    }
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      e.preventDefault();
      toggleDevPanel();
    }
  });

  // Dev panel buttons
  const devCloseBtn = document.getElementById("dev-panel-close");
  if (devCloseBtn) devCloseBtn.addEventListener("click", toggleDevPanel);
  const devResetBtn = document.getElementById("dev-panel-reset");
  if (devResetBtn)
    devResetBtn.addEventListener("click", async () => {
      await resetFeatureFlags();
      buildDevPanel();
      applyFeatureFlags();
    });

  // Apply initial feature flag state
  applyFeatureFlags();

  if (isFeatureEnabled("debug_mode")) {
    console.log("[Debug] Sito Greet initialized with feature flags:", {
      ..._featureFlagsCache,
    });
  }
})();
