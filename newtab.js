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
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
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

  switch (c) {
    case 0:
      base = "Cielo despejado ☀️. Día ideal para salir.";
      break;
    case 1:
      base = "Mayormente despejado 🌤️. Unas pocas nubes aquí y allá.";
      break;
    case 2:
      base = "Parcialmente nublado ⛅. Tal vez salga el sol luego.";
      break;
    case 3:
      base = "Cielo nublado ☁️. Día algo gris, pero tranquilo.";
      break;
    case 45:
    case 48:
      base = "Niebla 🌫️. Maneja con precaución.";
      break;
    case 51:
      base = "Llovizna ligera 🌦️. Lleva paraguas por si acaso ☂️.";
      break;
    case 53:
      base = "Llovizna moderada 🌧️. Mejor tener paraguas a mano ☔.";
      break;
    case 55:
      base = "Llovizna intensa 🌧️. Ideal para quedarse en casa con café ☕.";
      break;
    case 56:
    case 57:
      base = "Llovizna helada ❄️. Cuidado con superficies resbaladizas.";
      break;
    case 61:
      base = "Lluvia ligera 🌦️. Un paraguas podría ser buena idea ☂️.";
      break;
    case 63:
      base = "Lluvia moderada 🌧️. Evita mojarte sin abrigo.";
      break;
    case 65:
      base = "Lluvia intensa ⛈️. Mejor evitar salir sin necesidad.";
      break;
    case 66:
    case 67:
      base = "Lluvia helada ❄️. Abrígate y camina con cuidado.";
      break;
    case 71:
      base = "Nieve ligera 🌨️. Puede verse bonito afuera.";
      break;
    case 73:
      base = "Nieve moderada ❄️. Abrígate bien.";
      break;
    case 75:
      base = "Nieve intensa 🌨️❄️. Mejor permanecer en interiores.";
      break;
    case 77:
      base = "Caen granitos de nieve 🌨️.";
      break;
    case 80:
      base = "Chubascos débiles 🌦️. Tal vez llueva un poco.";
      break;
    case 81:
      base = "Chubascos moderados 🌧️. Lleva paraguas por si acaso ☂️.";
      break;
    case 82:
      base = "Chubascos fuertes ⛈️. Mejor tener paraguas o capucha.";
      break;
    case 85:
      base = "Chubascos de nieve 🌨️. Puede acumularse en el suelo.";
      break;
    case 86:
      base = "Chubascos de nieve intensos ❄️. Precaución al salir.";
      break;
    case 95:
      base = "Tormenta eléctrica ⚡. Quédate bajo techo si puedes.";
      break;
    case 96:
    case 99:
      base = "Tormenta con granizo ⛈️. Evita salir por seguridad.";
      break;
    default:
      base = "Clima no identificado 🤔.";
  }

  // Extras según temperatura y viento
  const extras = [];
  if (!Number.isNaN(w) && w >= 35) extras.push("Hace bastante viento 💨.");
  if (!Number.isNaN(t)) {
    const hot = units === "fahrenheit" ? t >= 86 : t >= 30;
    const cold = units === "fahrenheit" ? t <= 32 : t <= 0;

    if (hot) extras.push("Hace calor 🥵, hidrátate bien.");
    else if (cold) extras.push("Hace frío 🧣, abrígate bien.");
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
      el.textContent = "Set your location in Settings to see the weather.";
      return;
    }

    el.textContent = "Fetching weather…";
    const data = await fetchOpenMeteo({ lat: coords.lat, lon: coords.lon, units: settings.units, apiBase: settings.apiBase });
    const cw = data && data.current_weather;
    if (!cw) {
      el.textContent = "Weather took the day off.";
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
    if (el) el.textContent = "Weather unavailable. Maybe it's shy.";
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
  if (profileTextEl) profileTextEl.textContent = `Profile: ${profile_name}`;

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
  if (profileInit) profileInit.textContent = `Profile: ${profileName}`;

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
