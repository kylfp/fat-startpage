//Load Settings on open
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// Open settings panel button
document.getElementById("settingsBtn").addEventListener("click", () => {
  settingsPopup.showModal();
  fillSettingsInputs();
});

// Close settings panel button
document.getElementsByClassName("closePopupBtn")[1].addEventListener("click", () => {
  settingsPopup.close();
});

// Save settings Button
document.getElementById("saveBtn").addEventListener("click", () => {
  changeSettings();
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'js/weather.js';
  document.head.appendChild(script);
});

// Open weather expansion button
document.getElementById("expandWeatherBtn").addEventListener("click", () => {
  weatherExpansionPopup.showModal();
});

// Close settings panel button
document.getElementsByClassName("closePopupBtn")[0].addEventListener("click", () => {
  weatherExpansionPopup.close();
});

function init() {
  if (localStorage.getItem("settings") === null) {
    settings = {
      location: {
        latitude: '',
        longitude: ''
      },
      colors: {
        bg: '#000000',
        fg: '#ffffff',
        color1: '#ff0000',
        color2: '#ffff00',
        color3: '#00ff00',
        color4: '#0000ff'
      },
      bookmarks: {
        titles: [
          'Hobbies', 'Entertainment', 'Work', 'Shopping'
        ],
        names: [
          'GitHub', '', '', '', '', '', '', '', '', '',
          'Hulu', '', '', '', '', '', '', '', '', '',
          'Proton Mail', '', '', '', '', '', '', '', '', '',
          'Amazon Prime', '', '', '', '', '', '', '', '', ''
        ],
        urls: [
          'https://github.com', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', ''
        ]
      }
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  }
  updatePage();
}

function changeSettings() {
  let settings = JSON.parse(localStorage.getItem("settings"));

  //Colors
  settings.colors.bg = document.getElementById("bgInput").value;
  settings.colors.fg = document.getElementById("fgInput").value;
  settings.colors.color1 = document.getElementById("color1Input").value;
  settings.colors.color2 = document.getElementById("color2Input").value;
  settings.colors.color3 = document.getElementById("color3Input").value;
  settings.colors.color4 = document.getElementById("color4Input").value;

  // Location
  settings.location.latitude = document.getElementById("latitudeInput").value;
  settings.location.longitude = document.getElementById("longitudeInput").value;

  //Bookmarks
  const bookmarkCategoryInputs = document.getElementsByClassName("bookmarkCategoryInput");
  for(let i=0; i< bookmarkCategoryInputs.length; i++) {
    settings.bookmarks.titles[i] = bookmarkCategoryInputs[i].value;
  }

  const bookmarkNameInputs = document.getElementsByClassName("bookmarkNameInput");
  const bookmarkUrlInputs = document.getElementsByClassName("bookmarkUrlInput");
  for(let i=0; i< bookmarkNameInputs.length; i++) {
    settings.bookmarks.names[i] = bookmarkNameInputs[i].value;
    settings.bookmarks.urls[i] = bookmarkUrlInputs[i].value;
  }

  localStorage.setItem("settings", JSON.stringify(settings));
  console.log('Settings submited');
  updatePage();
}

function updatePage() {
  let settings = JSON.parse(localStorage.getItem("settings"));
  // ============================== COLORS ================================= //
  // -- General --
  document.getElementById("body").style.backgroundColor = settings.colors.bg;

  document.getElementById("card").style.color = settings.colors.fg;
  document.getElementById("card").style.backgroundColor = settings.colors.bg;
  document.getElementById("card").style.borderColor = settings.colors.fg;

  // -- Popups --
  document.getElementById("settingsPopup").style.color = colorModify(settings.colors.fg);
  document.getElementById("settingsPopup").style.backgroundColor = colorModify(settings.colors.bg);
  document.getElementById("settingsPopup").style.borderColor = colorModify(settings.colors.fg);

  document.getElementById("weatherExpansionPopup").style.color = colorModify(settings.colors.fg);
  document.getElementById("weatherExpansionPopup").style.backgroundColor = colorModify(settings.colors.bg);
  document.getElementById("weatherExpansionPopup").style.borderColor = colorModify(settings.colors.fg);

  // -- Inputs --
  const bookmarkCategoryInputs = document.getElementsByClassName("bookmarkCategoryInput");
  for(let i=0; i< bookmarkCategoryInputs.length; i++) {
    bookmarkCategoryInputs[i].style.color = colorModify(settings.colors.fg);
    bookmarkCategoryInputs[i].style.backgroundColor = colorModify(settings.colors.bg);
    bookmarkCategoryInputs[i].style.borderColor= colorModify(settings.colors.fg);
  }

  const bookmarkNameInputs = document.getElementsByClassName("bookmarkNameInput");
  const bookmarkUrlInputs = document.getElementsByClassName("bookmarkUrlInput");
  for(let i=0; i< bookmarkNameInputs.length; i++) {
    bookmarkNameInputs[i].style.color = colorModify(settings.colors.fg);
    bookmarkNameInputs[i].style.backgroundColor = colorModify(settings.colors.bg);
    bookmarkNameInputs[i].style.borderColor= colorModify(settings.colors.fg);
    bookmarkUrlInputs[i].style.color = colorModify(settings.colors.fg);
    bookmarkUrlInputs[i].style.backgroundColor = colorModify(settings.colors.bg);
    bookmarkUrlInputs[i].style.borderColor= colorModify(settings.colors.fg);
  }

  const locationInputs = document.getElementsByClassName("locationInput");
  for(let i=0; i< locationInputs.length; i++) {
    locationInputs[i].style.color = colorModify(settings.colors.fg);
    locationInputs[i].style.backgroundColor = colorModify(settings.colors.bg);
    locationInputs[i].style.borderColor= colorModify(settings.colors.fg);
  }

  // -- Buttons --
  colorNormButtons = document.getElementsByClassName("colorNormBtn");
  colorNormButtonsProps = document.getElementsByClassName("colorNormBtnProps");
  for(let i=0; i< colorNormButtons.length; i++) {
    colorNormButtons[i].style.color = settings.colors.fg;
    colorNormButtons[i].style.backgroundColor = settings.colors.bg;
    colorNormButtons[i].style.borderColor = settings.colors.fg;
    colorNormButtonsProps[i].setAttribute("stroke", settings.colors.fg);
    colorNormButtonsProps[i].setAttribute("fill", settings.colors.fg);
  }
  colorModButtons = document.getElementsByClassName("colorModBtn");
  colorModButtonsProps = document.getElementsByClassName("colorModBtnProps");
  for(let i=0; i< colorModButtons.length; i++) {
    colorModButtons[i].style.color = colorModify(settings.colors.fg);
    colorModButtons[i].style.backgroundColor = colorModify(settings.colors.bg);
    colorModButtons[i].style.borderColor = colorModify(settings.colors.fg);
    colorModButtonsProps[i].setAttribute("stroke", colorModify(settings.colors.fg));
    colorModButtonsProps[i].setAttribute("fill", colorModify(settings.colors.fg));
  }

  // -- Weather Image --
  weatherImageElements = document.getElementsByClassName("weather-image-settings");
  for(let i=0; i< weatherImageElements.length; i++) {
    weatherImageElements[i].setAttribute("stroke", settings.colors.fg);
    weatherImageElements[i].setAttribute("fill", settings.colors.bg);
  }

  // -- Search Bar --
  document.getElementById("search-input").style.color = settings.colors.fg;
  document.getElementById("search-input").style.backgroundColor = settings.colors.bg;
  document.getElementById("search-input").style.borderColor= settings.colors.fg;

  // -- Color 1 Elements --
  const color1Elements = document.getElementsByClassName("color1");
  for(let i=0; i< color1Elements.length; i++) {
    color1Elements[i].style.color = settings.colors.color1;
  }

  // -- Color 2 Elements --
  const color2Elements = document.getElementsByClassName("color2");
  for(let i=0; i< color2Elements.length; i++) {
    color2Elements[i].style.color = settings.colors.color2;
  }

  // -- Color 3 Elements --
  const color3Elements = document.getElementsByClassName("color3");
  for(let i=0; i< color3Elements.length; i++) {
    color3Elements[i].style.color = settings.colors.color3;
  }

  // -- Color 4 Elements --
  const color4Elements = document.getElementsByClassName("color4");
  for(let i=0; i< color4Elements.length; i++) {
    color4Elements[i].style.color = settings.colors.color4;
  }

  // ============================ BOOKMARKS ================================ //
  // -- Category Titles --
  const bookmarkCategories = document.getElementsByClassName("bookmarkCategory")
  for(let i=0; i< bookmarkCategories.length; i++) {
    bookmarkCategories[i].textContent = settings.bookmarks.titles[i];
  }

  // -- Bookmarks/Hyperlinks --
  const bookmarkElements = document.getElementsByClassName("bookmark");
  for(let i=0; i< bookmarkElements.length; i++) {
    bookmarkElements[i].textContent = settings.bookmarks.names[i];
    bookmarkElements[i].href= settings.bookmarks.urls[i];
  }
}

function fillSettingsInputs() {
  let settings = JSON.parse(localStorage.getItem("settings"));
  document.getElementById("bgInput").value = settings.colors.bg;
  document.getElementById("fgInput").value = settings.colors.fg;
  document.getElementById("color1Input").value = settings.colors.color1;
  document.getElementById("color2Input").value = settings.colors.color2;
  document.getElementById("color3Input").value = settings.colors.color3;
  document.getElementById("color4Input").value = settings.colors.color4;

  const bookmarkCategoryInputs = document.getElementsByClassName("bookmarkCategoryInput");
  for(let i=0; i<bookmarkCategoryInputs.length; i++) {
    bookmarkCategoryInputs[i].value = settings.bookmarks.titles[i];
  }

  const bookmarkNameInputs = document.getElementsByClassName("bookmarkNameInput");
  const bookmarkUrlInputs = document.getElementsByClassName("bookmarkUrlInput");
  for(let i=0; i<bookmarkNameInputs.length; i++) {
    bookmarkNameInputs[i].value = settings.bookmarks.names[i];
    bookmarkUrlInputs[i].value = settings.bookmarks.urls[i];
  }
}

function colorModify(color) {
  const hexCode = color.slice(1);
  const hexArray = hexCode.match(/.{1,2}/g) || [];
  let r = parseFloat( parseInt(hexArray[0], 16) );
  let g = parseFloat( parseInt(hexArray[1], 16) );
  let b = parseFloat( parseInt(hexArray[2], 16) );
  let avg = (r + g + b) / 3
  if (avg > 128) {
    r = Math.floor(r * 0.80);
    g = Math.floor(g * 0.80);
    b = Math.floor(b * 0.80);
  }
  else {
    r = tenUp(r);
    g = tenUp(g);
    b = tenUp(b);
  }
  return "#" + (r.toString(16)).padStart(2, "0") + (g.toString(16)).padStart(2, "0") + (b.toString(16)).padStart(2, "0");
}

function tenUp(number) {
  let n = number;
  if (n==0) {
    n = 30;
  }
  else {
    n = Math.floor(n * 1.2);
  }
  return n;
}
