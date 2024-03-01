//Load saved settings on open
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  if (localStorage.getItem("settings") === null) {
    console.log('INFO: Default Style Settings')
    settings = {
      colors: {
        bg: '#24283b',
        fg: '#c0caf5',
        color1: '#7aa2f7',
        color2: '#9d7cd8',
        color3: '#ff9e64',
        color4: '#9ece6a'
      },
      layout: {
        dispType: [1],                                           // 1 = Grid 2 = Scroll
        catCount : [4],                                          // # of BM cats
        bmPerCatCount: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // # of BM in cat
      },
      bookmarks: {
        catTitle: [
          'Hobbies', 'Entertainment', 'Work', 'Shopping', 'Category 5',
          'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10',
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
