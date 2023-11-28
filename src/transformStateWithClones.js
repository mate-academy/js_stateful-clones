'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modified = Object.assign({}, state);
  const resultArr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(modified, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const item of actions[i].keysToRemove) {
          delete modified[item];
        }
        break;

      case 'clear':
        for (const key of Object.keys(modified)) {
          delete modified[key];
        }
    }

    resultArr.push(Object.assign({}, modified));
  }

  return resultArr;
}

module.exports = transformStateWithClones;
