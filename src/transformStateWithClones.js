'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let modified = Object.assign({}, state);
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
        modified = {};
    }

    resultArr.push(Object.assign({}, modified));
  }

  return resultArr;
}

module.exports = transformStateWithClones;
