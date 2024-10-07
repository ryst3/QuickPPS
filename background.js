/**
 * @param {string} url - A string.
 */
function parsePaperInfo(url) {
  let p = url;

  // parsing url to get pastpaper info
  // this works with files that end with the format 0000_mYY_xx_XX

  const firstIndex = p.lastIndexOf("/") + 1;
  const lastIndex = p.length - 4;

  p = p.slice(firstIndex, lastIndex);

  return p
    .replaceAll("_", " ")
    .replace("ms", "paper")
    .replace("qp", "paper")
    .replace("  ", " ")
    .replace(" m", " feb march 20")
    .replace(" s", " may june 20")
    .replace(" w", " october november 20");
}

async function searchYoutube() {

  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let currentTabIndex = tabs[0].index;

  chrome.storage.local.get(["targetWindow"]).then(async (result) => {
    const searchUrl =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(parsePaperInfo(tabs[0].url));

    if (result.targetWindow == "newWindow") {
      chrome.windows.create({
        url: searchUrl,
      });
    } else if (result.targetWindow == "newWindowIncognito") {
      chrome.windows.create({
        url: searchUrl,
        incognito: true,
      });
    } else if (result.targetWindow == "newTab") {
      chrome.tabs.create({
        url: searchUrl,
        index: currentTabIndex + 1,
      });
    } else {
      chrome.tabs.create({
        url: searchUrl,
        index: currentTabIndex + 1,
      });
      chrome.storage.local.set({ targetWindow: "newTab" });
    }
  });
}

chrome.action.onClicked.addListener(() => searchYoutube());
chrome.commands.onCommand.addListener((command) => {
  if (command === "run_extension") {
    searchYoutube()
  }
})
