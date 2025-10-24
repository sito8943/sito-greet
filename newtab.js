// --- Simple i18n support (EN/ES) ---
const CURRENT_LANG = ((navigator.language || "").toLowerCase().startsWith("es")) ? "es" : "en";

const I18N = {
  en: {
    titleNewTab: "New Tab",
    settings: "Settings",
    whoAreYou: "Who are you?",
    whichProfile: "Which profile is this?",
    usernamePlaceholder: "Type your username here",
    profilePlaceholder: "Type profile name here",
    disableAnimations: "Disable animations",
    weather: "Weather",
    weatherEnabled: "Show weather on new tab",
    latitude: "Latitude",
    longitude: "Longitude",
    tempUnits: "Temperature units",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    apiBase: "Open‑Meteo API base (optional)",
    save: "Save",
    cancel: "Cancel",
    madeBy: "Made by",
    profileLabel: "Profile",
    fetchingWeather: "Fetching weather…",
    setLocationToSeeWeather: "Set your location in Settings to see the weather.",
    weatherOff: "Weather took the day off.",
    weatherUnavailable: "Weather unavailable. Maybe it's shy.",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
  },
  es: {
    titleNewTab: "Nueva pestaña",
    settings: "Ajustes",
    whoAreYou: "¿Quién eres?",
    whichProfile: "¿Qué perfil es este?",
    usernamePlaceholder: "Escribe tu nombre de usuario",
    profilePlaceholder: "Escribe el nombre del perfil",
    disableAnimations: "Desactivar animaciones",
    weather: "Clima",
    weatherEnabled: "Mostrar el clima en nueva pestaña",
    latitude: "Latitud",
    longitude: "Longitud",
    tempUnits: "Unidades de temperatura",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    apiBase: "Base de la API Open‑Meteo (opcional)",
    save: "Guardar",
    cancel: "Cancelar",
    madeBy: "Hecho por",
    profileLabel: "Perfil",
    fetchingWeather: "Obteniendo clima…",
    setLocationToSeeWeather: "Configura tu ubicación en Ajustes para ver el clima.",
    weatherOff: "El clima se tomó el día libre.",
    weatherUnavailable: "Clima no disponible. Quizás está tímido.",
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
  },
};

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
  if (profileInput) profileInput.value = stored.profile_name ?? "Default Profile";

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
  if (latEl && typeof stored.weather_latitude === "number") latEl.value = String(stored.weather_latitude);
  const lonEl = document.getElementById("input-weather-lon");
  if (lonEl && typeof stored.weather_longitude === "number") lonEl.value = String(stored.weather_longitude);
  const unitsEl = document.getElementById("input-weather-units");
  if (unitsEl) unitsEl.value = stored.weather_units === "fahrenheit" ? "fahrenheit" : "celsius";
  const apiEl = document.getElementById("input-weather-api");
  if (apiEl && stored.weather_api_base) apiEl.value = stored.weather_api_base;

  return {
    enabled: Boolean(stored.weather_enabled),
    lat: typeof stored.weather_latitude === "number" ? stored.weather_latitude : undefined,
    lon: typeof stored.weather_longitude === "number" ? stored.weather_longitude : undefined,
    units: stored.weather_units === "fahrenheit" ? "fahrenheit" : "celsius",
    apiBase: stored.weather_api_base || "",
  };
}

function toDisplayTemp(t, units) {
  const unitChar = units === "fahrenheit" ? "°F" : "°C";
  return `${Math.round(t)}${unitChar}`;
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
      base = isEs ? "Cielo despejado ☀️. Día ideal para salir." : "Clear sky ☀️. Perfect day to go out.";
      break;
    case 1:
      base = isEs ? "Mayormente despejado 🌤️. Unas pocas nubes aquí y allá." : "Mostly clear 🌤️. A few clouds around.";
      break;
    case 2:
      base = isEs ? "Parcialmente nublado ⛅. Tal vez salga el sol luego." : "Partly cloudy ⛅. Sun may pop out later.";
      break;
    case 3:
      base = isEs ? "Cielo nublado ☁️. Día algo gris, pero tranquilo." : "Overcast ☁️. A bit gray, but calm.";
      break;
    case 45:
    case 48:
      base = isEs ? "Niebla 🌫️. Maneja con precaución." : "Fog 🌫️. Drive carefully.";
      break;
    case 51:
      base = isEs ? "Llovizna ligera 🌦️. Lleva paraguas por si acaso ☂️." : "Light drizzle 🌦️. Bring an umbrella just in case ☂️.";
      break;
    case 53:
      base = isEs ? "Llovizna moderada 🌧️. Mejor tener paraguas a mano ☔." : "Moderate drizzle 🌧️. Keep an umbrella handy ☔.";
      break;
    case 55:
      base = isEs ? "Llovizna intensa 🌧️. Ideal para quedarse en casa con café ☕." : "Heavy drizzle 🌧️. Cozy coffee weather ☕.";
      break;
    case 56:
    case 57:
      base = isEs ? "Llovizna helada ❄️. Cuidado con superficies resbaladizas." : "Freezing drizzle ❄️. Watch for slippery surfaces.";
      break;
    case 61:
      base = isEs ? "Lluvia ligera 🌦️. Un paraguas podría ser buena idea ☂️." : "Light rain 🌦️. An umbrella might help ☂️.";
      break;
    case 63:
      base = isEs ? "Lluvia moderada 🌧️. Evita mojarte sin abrigo." : "Moderate rain 🌧️. Stay dry out there.";
      break;
    case 65:
      base = isEs ? "Lluvia intensa ⛈️. Mejor evitar salir sin necesidad." : "Heavy rain ⛈️. Best to avoid going out.";
      break;
    case 66:
    case 67:
      base = isEs ? "Lluvia helada ❄️. Abrígate y camina con cuidado." : "Freezing rain ❄️. Bundle up and walk carefully.";
      break;
    case 71:
      base = isEs ? "Nieve ligera 🌨️. Puede verse bonito afuera." : "Light snow 🌨️. Looks pretty outside.";
      break;
    case 73:
      base = isEs ? "Nieve moderada ❄️. Abrígate bien." : "Moderate snow ❄️. Dress warm.";
      break;
    case 75:
      base = isEs ? "Nieve intensa 🌨️❄️. Mejor permanecer en interiores." : "Heavy snow 🌨️❄️. Better stay indoors.";
      break;
    case 77:
      base = isEs ? "Caen granitos de nieve 🌨️." : "Snow grains falling 🌨️.";
      break;
    case 80:
      base = isEs ? "Chubascos débiles 🌦️. Tal vez llueva un poco." : "Light showers 🌦️. Might rain a bit.";
      break;
    case 81:
      base = isEs ? "Chubascos moderados 🌧️. Lleva paraguas por si acaso ☂️." : "Moderate showers 🌧️. Umbrella could help ☂️.";
      break;
    case 82:
      base = isEs ? "Chubascos fuertes ⛈️. Mejor tener paraguas o capucha." : "Heavy showers ⛈️. Umbrella or hood recommended.";
      break;
    case 85:
      base = isEs ? "Chubascos de nieve 🌨️. Puede acumularse en el suelo." : "Snow showers 🌨️. Might accumulate on the ground.";
      break;
    case 86:
      base = isEs ? "Chubascos de nieve intensos ❄️. Precaución al salir." : "Heavy snow showers ❄️. Use caution.";
      break;
    case 95:
      base = isEs ? "Tormenta eléctrica ⚡. Quédate bajo techo si puedes." : "Thunderstorm ⚡. Stay indoors if you can.";
      break;
    case 96:
    case 99:
      base = isEs ? "Tormenta con granizo ⛈️. Evita salir por seguridad." : "Hailstorm ⛈️. Best to stay inside.";
      break;
    default:
      base = isEs ? "Clima no identificado 🤔." : "Weather not identified 🤔.";
  }

  // Extras according to temperature and wind
  const extras = [];
  if (!Number.isNaN(w) && w >= 35) extras.push(isEs ? "Hace bastante viento 💨." : "Quite windy 💨.");
  if (!Number.isNaN(t)) {
    const hot = units === "fahrenheit" ? t >= 86 : t >= 30;
    const cold = units === "fahrenheit" ? t <= 32 : t <= 0;
    if (hot) extras.push(isEs ? "Hace calor 🥵, hidrátate bien." : "It's hot 🥵, stay hydrated.");
    else if (cold) extras.push(isEs ? "Hace frío 🧣, abrígate bien." : "It's cold 🧣, dress warm.");
  }

  return [base, ...extras].join(" ");
}

async function fetchOpenMeteo({ lat, lon, units, apiBase }) {
  const base = apiBase && apiBase.trim().length ? apiBase.trim() : "https://api.open-meteo.com/v1/forecast";
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
  if (typeof storedLat === "number" && typeof storedLon === "number") {
    return { lat: storedLat, lon: storedLon };
  }
  return undefined;
}

async function renderWeather() {
  const el = document.getElementById("weather");
  if (!el) return;
  try {
    const settings = await getWeatherSettings();
    if (!settings.enabled) {
      el.textContent = "";
      return;
    }

    const coords = await getCoordsPreferGeolocation(settings.lat, settings.lon);
    if (!coords) {
      el.textContent = tr("setLocationToSeeWeather");
      return;
    }

    el.textContent = tr("fetchingWeather");
    const data = await fetchOpenMeteo({ lat: coords.lat, lon: coords.lon, units: settings.units, apiBase: settings.apiBase });
    const cw = data && data.current_weather;
    if (!cw) {
      el.textContent = tr("weatherOff");
      return;
    }

    const tempTxt = toDisplayTemp(cw.temperature, settings.units);
    const msg = weatherCodeToMessage(cw.weathercode, cw.temperature, cw.windspeed, settings.units);
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
    el.textContent = `${icon} ${tempTxt} — ${msg}`;
  } catch (err) {
    const el = document.getElementById("weather");
    if (el) el.textContent = tr("weatherUnavailable");
  }
}

function openDialog() {
  const dialog = document.getElementById("dialog-settings");
  if (dialog && typeof dialog.showModal === "function") dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById("dialog-settings");
  if (dialog && typeof dialog.close === "function") dialog.close();
}

async function updateSettings(e) {
  const usernameEl = document.getElementById("input-username");
  const profileEl = document.getElementById("input-profile");
  const disableAnimationsEl = document.getElementById("input-disable-animations");
  const weatherEnabledEl = document.getElementById("input-weather-enabled");
  const weatherLatEl = document.getElementById("input-weather-lat");
  const weatherLonEl = document.getElementById("input-weather-lon");
  const weatherUnitsEl = document.getElementById("input-weather-units");
  const weatherApiEl = document.getElementById("input-weather-api");
  const username = (usernameEl && usernameEl.value) || "User";
  const profile_name = (profileEl && profileEl.value) || "Default Profile";
  const disable_animations = Boolean(disableAnimationsEl && disableAnimationsEl.checked);
  const weather_enabled = Boolean(weatherEnabledEl && weatherEnabledEl.checked);
  const weather_latitude = weatherLatEl && weatherLatEl.value !== "" ? Number(weatherLatEl.value) : undefined;
  const weather_longitude = weatherLonEl && weatherLonEl.value !== "" ? Number(weatherLonEl.value) : undefined;
  const weather_units = weatherUnitsEl && weatherUnitsEl.value === "fahrenheit" ? "fahrenheit" : "celsius";
  const weather_api_base = (weatherApiEl && weatherApiEl.value && weatherApiEl.value.trim()) || "";

  const greeting = getGreeting();

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.textContent = `${greeting}, ${username}!`;
  const profileTextEl = document.getElementById("profile");
  if (profileTextEl) profileTextEl.textContent = `${tr("profileLabel")}: ${profile_name}`;

  if (hasBrowserStorage()) {
    const toSet = { username, profile_name, disable_animations, weather_enabled, weather_units, weather_api_base };
    if (typeof weather_latitude === "number") toSet.weather_latitude = weather_latitude;
    if (typeof weather_longitude === "number") toSet.weather_longitude = weather_longitude;
    await browser.storage.local.set(toSet);
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem("username", username);
      localStorage.setItem("profile_name", profile_name);
      localStorage.setItem("disable_animations", String(disable_animations));
      localStorage.setItem("weather_enabled", String(weather_enabled));
      if (typeof weather_latitude === "number") localStorage.setItem("weather_latitude", String(weather_latitude));
      if (typeof weather_longitude === "number") localStorage.setItem("weather_longitude", String(weather_longitude));
      localStorage.setItem("weather_units", weather_units);
      localStorage.setItem("weather_api_base", weather_api_base);
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
}

{
  const clock = document.getElementById("clock");
  if (clock) clock.textContent = getFormattedDateTime();
}

(async () => {
  // Apply i18n labels/placeholders ASAP
  applyI18n();
  const disableAnimations = await getDisableAnimations();
  const reducedMotion = prefersReducedMotion() || disableAnimations;
  const greeting = getGreeting();
  const username = await getUserName();
  const profileName = await getProfileName();

  // Expose to CSS via root data attribute for animation control
  const root = document.documentElement;
  if (root) {
    if (reducedMotion) root.setAttribute("data-animations", "off");
    else root.removeAttribute("data-animations");
  }

  setInterval(() => {
    const clock = document.getElementById("clock");
    if (clock) clock.textContent = getFormattedDateTime();
  }, 1000);

  const settingsBtn = document.getElementById("settings-button");
  if (settingsBtn) settingsBtn.addEventListener("click", openDialog);
  const cancelBtn = document.getElementById("cancel");
  if (cancelBtn) cancelBtn.addEventListener("click", closeDialog);
  const form = document.getElementById("form-settings");
  if (form) form.addEventListener("submit", updateSettings);
  const greetingElInit = document.getElementById("greeting");
  if (greetingElInit) greetingElInit.textContent = `${greeting}, ${username}!`;
  const profileInit = document.getElementById("profile");
  if (profileInit) profileInit.textContent = `${tr("profileLabel")}: ${profileName}`;

  // Trigger entrance animations for greeting and profile
  const greetingEl = document.getElementById("greeting");
  const profileEl = document.getElementById("profile");
  if (!reducedMotion) {
    if (greetingEl) greetingEl.classList.add("fancy-appear");
    if (profileEl) profileEl.classList.add("fancy-appear");
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
          })
      )
    );
  }

  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.classList.add("show");
  const footer = document.querySelector("footer");
  if (footer) footer.classList.add("show");

  // Weather after entrance
  renderWeather();
})();
