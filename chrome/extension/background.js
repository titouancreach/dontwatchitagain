const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

/**
 * Escape a string in order for it to be used in regex.
 *
 * @params {string} The string to escape.
 *
 * @returns {string} The escaped string.
 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Generate a UUID.
 *
 * @returns {string} A unique ID.
 */
function guuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Compare histories.
 *
 * @returns {boolean} The result of the test.
 */
 function historyComparator(lhf, rhf) {
  return (
    lhf.name === rhf.name &&
    lhf.episode === rhf.episode &&
    lhf.season === rhf.season);
 }


/**
 * Listener when a tab is updated.
 * We access to the store, modify it and save it.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  /*
   * To prevent multiple "change tab event", we accept only notifications with the status loading.
   * It allows the user to don't wait for the page to be completed.
   */
  if (changeInfo.status !== "loading")
    return;

  console.log('get a notifications here');

  chrome.storage.local.get('state', obj => {

    let state = JSON.parse(obj.state || '{}');

    const { templateUrl } = state;
    const { url } = tab;

    let history = getUrlMatches(templateUrl, url);

    history
      .map(newHistory => {
        return {...newHistory, id: guuid()};
      })
      .forEach(newHistory => {
        // search if the history is already there
        const alreadyExist = state.history.findIndex(existingHistory =>
          historyComparator(existingHistory, newHistory)
        ) !== -1;

        // save the history.
        if (!alreadyExist) {
          state.history.push(newHistory);
          chrome.storage.local.set({ state: JSON.stringify(state) });
        } else {
          chrome.notifications.create(guuid(), {
            type: 'basic',
            iconUrl: 'img/icon-48.png',
            title: 'too bad !',
            message: 'You have already seen the episode.'
          }, () => {
            console.log('Notification printed');
          });
        }
      })
  });
});



/**
 * Try to match the url with the templateUrl array.
 * For each match, return an array containing the name, the season and the episode.
 *
 * @param {array} Array of template url.
 * @param {string} Url to compare.
 *
 * @returns An array of matches.
 */
function getUrlMatches(templatesUrl, url) {
  return templatesUrl
    .map(i => i.name)
    .map(templateUrl => {

      // for each template, we create a regex
      const r = escapeRegExp(templateUrl)
        .replace(escapeRegExp('${NAME}'), '(.*)')
        .replace(escapeRegExp('${IGNORE}'), '.*')
        .replace(escapeRegExp('${SEASON}'), '(.*)')
        .replace(escapeRegExp('${EPISODE}'), '(.*)');

      // We need to keep the order of the placeholders safe in order to
      // retrieving the datas later.
      // For that, we sort an array which contains the positions of each token.
      const arr = [{
  	    pos: templateUrl.search(escapeRegExp('${NAME}')),
  	    id: 'NAME'
      }, {
      	pos: templateUrl.search(escapeRegExp('${SEASON}')),
      	id: 'SEASON'
      }, {
      	pos: templateUrl.search(escapeRegExp('${EPISODE}')),
      	id: 'EPISODE'
      }];

      let sorted = arr.sort((a, b) => {
        if (a.pos > b.sort) return 1;
        if (b.pos > a.sort) return -1;
        return 0;
      });

      let gr = url.match(r);

      if (gr) {
        // remove the first group (which contain the full expr)
        gr = gr.slice(1, gr.length);

        return {
          name: gr[sorted.findIndex(i =>  i.id === 'NAME')],
          season: gr[sorted.findIndex(i => i.id === 'SEASON')],
          episode: gr[sorted.findIndex(i =>  i.id === 'EPISODE')]
        };
      } else {
        return null;
      }
    })
    .filter(result => result !== null);
}


require('./background/contextMenus');
