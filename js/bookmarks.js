//Load saved bookmarks on open
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = {
      cat1: {
        title:['Hobbies'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat2: {
        title:['Entertainment'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat3: {
        title:['Work'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat4: {
        title:['Shopping'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat5: {
        title:['Category 5'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat6: {
        title:['Category 6'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat7: {
        title:['Category 7'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
      cat8: {
        title:['Category 8'],
        names: ['', '', '', '', '', '', '', '', '', '', ],
        urls: ['', '', '', '', '', '', '', '', '', '', ],
      },
    }
    localStorage.getItem('bookmarks', JSON.stringify(bookmarks));
  }
  update();
}
