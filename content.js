function replaceLogo() {
  const logo = document.querySelector("#logo");
  if (!logo) {
    console.log("Logo not found");
    return;
  }

  if (document.getElementById("study-logo")) {
    return;
  }

  const container = document.createElement("div");
  container.id = "study-logo";

  const ytLogo = document.createElement("img");
  ytLogo.id = "youtube-layer";
  ytLogo.src = chrome.runtime.getURL("assets/youtube-logo.png");

  const mascot = document.createElement("img");
  mascot.id = "study-mascot";
  mascot.src = chrome.runtime.getURL("assets/mascot.gif");

  container.appendChild(ytLogo);
  container.appendChild(mascot);

  logo.replaceChildren(container);
  console.log("Logo updated");
}
function addBackground() {
  if (document.getElementById("study-background")) {
    return;
  }

  const background = document.createElement("div");
  background.id = "study-background";
  document.body.appendChild(background);
}
function handleThumbnailOpacity(card, opacityValue) {
  const thumbnail = card.querySelector('#thumbnail');
  if (!thumbnail) return;
  const standardImg = thumbnail.querySelector('img');
  if (standardImg) {
    standardImg.style.opacity = opacityValue;
  }
  const shadowImgContainer = thumbnail.querySelector('yt-img-shadow');
  if (shadowImgContainer && shadowImgContainer.shadowRoot) {
    const hiddenImg = shadowImgContainer.shadowRoot.querySelector('#img');
    if (hiddenImg) {
      hiddenImg.style.opacity = opacityValue;
      hiddenImg.style.transition = 'opacity 0.25s ease';
    }
  }
}
function updateAllThumbnails() {
  const cards = document.querySelectorAll('ytd-rich-item-renderer, ytd-rich-grid-slim-media');
  cards.forEach(card => {
    if (!card.matches(':hover')) {
      handleThumbnailOpacity(card, '0.10');
    }
  });
}
function initialize() {
  console.log("YouTube Study Mode loaded");
  
  replaceLogo();
  addBackground();
  updateAllThumbnails();
}
initialize();
document.addEventListener('mouseover', (event) => {
  const card = event.target.closest('ytd-rich-item-renderer, ytd-rich-grid-slim-media');
  if (card) {
    handleThumbnailOpacity(card, '1.0');
  }
});

document.addEventListener('mouseout', (event) => {
  const card = event.target.closest('ytd-rich-item-renderer, ytd-rich-grid-slim-media');
  if (card) {
    handleThumbnailOpacity(card, '0.10');
  }
});
const observer = new MutationObserver(() => {
  updateAllThumbnails();
  replaceLogo(); 
});
observer.observe(document.body, { childList: true, subtree: true }); 