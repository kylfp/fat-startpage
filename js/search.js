document.addEventListener('DOMContentLoaded', () => {
  init();
});

document.getElementById('searchEngineBtn').addEventListener('click', () => {
  let dropdown = document.getElementById('searchDropdownContent');
  dropdown.style.display = dropdown.style.display == 'block' ? 'none' : 'block';
});

document.getElementById('braveSearch').addEventListener('click', () => {
  save('brave');
  update();
});

document.getElementById('startpageSearch').addEventListener('click', () => {
  save('startpage');
  update();
});

document.getElementById('googleSearch').addEventListener('click', () => {
  save('google');
  update();
});

document.getElementById('duckduckgoSearch').addEventListener('click', () => {
  save('duckduckgo');
  update();
});

document.getElementById('bingSearch').addEventListener('click', () => {
  save('bing');
  update();
});

function init() {
  if(localStorage.getItem('searchEng') === null) {
    console.info('INFO: Default Search Settings')
    save('brave');
  }
  else {
    console.info('INFO: User Search Settings')
  }
  update();
}

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

function save(searchEngine) {
  let searchEng = [searchEngine,];
  localStorage.setItem('searchEng', JSON.stringify(searchEng));
  console.info('INFO: Search Settings Updated - ' + searchEngine);
}

function update() {
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
  }
}
