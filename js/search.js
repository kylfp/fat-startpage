// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

document.getElementById('showSearchSettingsBtn').addEventListener('click', () => {
  searchSettingsDialog.showModal();
});

document.getElementById('searchSettingsSaveBtn').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  saveSearch(searchSettingsInput.value);
  updateSearch();
  searchSettingsInput.value = '';
});

document.getElementById('braveSearch').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  searchSettingsInput.value = 'brave'
});

document.getElementById('startpageSearch').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  searchSettingsInput.value = 'startpage'
});

document.getElementById('googleSearch').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  searchSettingsInput.value = 'google'
});

document.getElementById('duckduckgoSearch').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  searchSettingsInput.value = 'duckduckgo'
});

document.getElementById('bingSearch').addEventListener('click', () => {
  let searchSettingsInput = document.getElementById('searchSettingsInput');
  searchSettingsInput.value = 'bing'
});

// Required Skeleton Methods
function initSearch() {
  if(localStorage.getItem('searchEng') === null) {
    console.info('INFO: Default Search Settings')
    saveSearch('brave');
  }
  else {
    console.info('INFO: User Search Settings')
  }
  updateSearch();
}


function saveSearch(searchEngine) {
  let searchEng = [searchEngine];
  localStorage.setItem('searchEng', JSON.stringify(searchEng));
  console.info('INFO: Search Settings Saved - ' + searchEngine);
}


function updateSearch() {
  let searchEng = JSON.parse(localStorage.getItem('searchEng'));
  console.info('INFO: Search Engine Changed - ' + searchEng[0]);
  const searchUrl = document.getElementById('searchUrl');
  const searchInput = document.getElementById('searchInput');
  switch (searchEng[0]) {
    case 'brave':
      searchUrl.action = searchEngines.brave[1];
      searchInput.placeholder = searchEngines.brave[0] + ' Search';
      break;
    case 'startpage':
      searchUrl.action = searchEngines.startpage[1];
      searchInput.placeholder = searchEngines.startpage[0] + ' Search';
      break;
    case 'duckduckgo':
      searchUrl.action = searchEngines.duckduckgo[1];
      searchInput.placeholder = searchEngines.duckduckgo[0] + ' Search';
      break;
    case 'google':
      searchUrl.action = searchEngines.google[1];
      searchInput.placeholder = searchEngines.google[0] + ' Search';
      break;
    case 'bing':
      searchUrl.action = searchEngines.bing[1];
      searchInput.placeholder = searchEngines.bing[0] + ' Search';
      break;
    default:
      searchUrl.action = searchEng[0];
      searchInput.placeholder = 'Web Search'
  }
}


// Helper Methods/Consts
const searchEngines = {
  brave: [
    'Brave', 'https://search.brave.com/search?q={}',
  ],
  startpage: [
    'Startpage', 'https://www.startpage.com/sp/search?q={}',
  ],
  google: [
    'Google', 'https://www.google.com/search?q={}',
  ],
  duckduckgo: [
    'DuckDuckGo', 'https://duckduckgo.com/?t=h_&q={}',
  ],
  bing: [
    'Bing', 'https://www.bing.com/search?q={}',
  ],
}
