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
  const username = (usernameEl && usernameEl.value) || "User";
  const profile_name = (profileEl && profileEl.value) || "Default Profile";

  const greeting = getGreeting();

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.textContent = `${greeting}, ${username}!`;
  const profileTextEl = document.getElementById("profile");
  if (profileTextEl) profileTextEl.textContent = `Profile: ${profile_name}`;

  if (hasBrowserStorage()) {
    await browser.storage.local.set({ username, profile_name });
  } else if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem("username", username);
      localStorage.setItem("profile_name", profile_name);
    } catch (_) {}
  }
}

{
  const clock = document.getElementById("clock");
  if (clock) clock.textContent = getFormattedDateTime();
}

(async () => {
  const reducedMotion = prefersReducedMotion();
  const greeting = getGreeting();
  const username = await getUserName();
  const profileName = await getProfileName();

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
})();
