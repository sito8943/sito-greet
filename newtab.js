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
  return stored.username || "User";
}

async function getProfileName() {
  const stored = await browser.storage.local.get("profile_name");
  return stored.profile_name || "Default Profile";
}

function closeSettings() {
  document.getElementById("settings-menu").classList.remove("opened");
}

function toggleSettings(e) {
  const menu = document.getElementById("settings-menu");
  if (menu.classList.contains("opened")) {
    closeSettings();
    window.removeEventListener("click", closeSettings);
  } else {
    menu.classList.add("opened");
    e.stopPropagation();
    window.addEventListener("click", closeSettings);
  }
}

function toggleChangeUsername() {
  const dialog = document.getElementById("change-username");
  dialog.showModal();
}

function closeDialog(dialog) {
  if (dialog) {
    dialog.close();
  }
}

async function updateUserName(e) {
  const username = document.getElementById("input-username").value;

  await browser.storage.local.set({ username });
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
    .getElementById("user-name")
    .addEventListener("click", toggleChangeUsername);
  document
    .getElementById("settings-button")
    .addEventListener("click", toggleSettings);
  document.getElementById("cancel-username").addEventListener("click", () => {
    const dialog = document.getElementById("change-username");
    closeDialog(dialog);
  });
  document
    .getElementById("form-username")
    .addEventListener("submit", updateUserName);
  document.getElementById("greeting").textContent = `${greeting}, ${username}!`;
  document.getElementById("profile").textContent = `Profile: ${profileName}`;
})();
