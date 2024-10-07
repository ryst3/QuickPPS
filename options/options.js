const applySettings = document.getElementById("button");

chrome.storage.local.get(["targetWindow"]).then(async (result) => {
  const selectRadio = document.getElementById(result.targetWindow);
  if (selectRadio) {
    selectRadio.checked = true;
  }
});

applySettings.addEventListener("click", () => {
  const selectedRadio = document.querySelector(
    'input[name="quick-search-location"]:checked'
  );
  chrome.storage.local.set({ targetWindow: selectedRadio.value });
});
