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

async function getUserName() {
  const stored = await browser.storage.local.get("username");

  const username = document.getElementById("input-username");
  username.value = stored.username ?? "User";

  return stored.username || "User";
}

async function getProfileName() {
  const stored = await browser.storage.local.get("profile_name");

  const profile = document.getElementById("input-profile");
  profile.value = stored.profile_name ?? "Default Profile";

  return stored.profile_name || "Default Profile";
}

function openDialog() {
  const dialog = document.getElementById("dialog-settings");
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById("dialog-settings");
  dialog.close();
}

async function updateSettings(e) {
  const username = document.getElementById("input-username").value;
  const profile_name = document.getElementById("input-profile").value;

  const greeting = getGreeting();

  document.getElementById("greeting").textContent = `${greeting}, ${username}!`;
  document.getElementById("profile").textContent = `Profile: ${profile_name}`;

  await browser.storage.local.set({ username, profile_name });
}

document.getElementById("clock").textContent = getFormattedDateTime();

(async () => {
  const greeting = getGreeting();
  const username = await getUserName();
  const profileName = await getProfileName();

  setInterval(() => {
    document.getElementById("clock").textContent = getFormattedDateTime();
  }, 1000);

  document
    .getElementById("settings-button")
    .addEventListener("click", openDialog);
  document.getElementById("cancel").addEventListener("click", closeDialog);
  document
    .getElementById("form-settings")
    .addEventListener("submit", updateSettings);
  document.getElementById("greeting").textContent = `${greeting}, ${username}!`;
  document.getElementById("profile").textContent = `Profile: ${profileName}`;

  // Trigger entrance animations for greeting and profile
  const greetingEl = document.getElementById("greeting");
  const profileEl = document.getElementById("profile");
  greetingEl.classList.add("fancy-appear");
  profileEl.classList.add("fancy-appear");

  // Wait until both animations finish, then fade in clock and footer
  await Promise.all(
    [greetingEl, profileEl].map(
      (el) =>
        new Promise((resolve) => {
          // If the animation is not applied for any reason, resolve quickly
          let resolved = false;
          const done = () => {
            if (resolved) return;
            resolved = true;
            el.removeEventListener("animationend", done);
            resolve();
          };
          el.addEventListener("animationend", done, { once: true });
          // Safety timeout in case no event fires
          setTimeout(done, 800);
        })
    )
  );

  document.getElementById("clock").classList.add("show");
  document.querySelector("footer").classList.add("show");
})();
