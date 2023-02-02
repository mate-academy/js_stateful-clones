'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let clone = {};

  for (let i = 0; i < actions.length; i++) {
    if (result.length === 0) {
      clone = Object.assign({}, state);
    } else {
      clone = Object.assign({}, result[result.length - 1]);
    }

    switch (actions[i].type) {
      case 'addProperties':
        result.push(Object.assign({}, clone, actions[i].extraData));
        break;

      case 'removeProperties':
        for (let n = 0; n < actions[i].keysToRemove.length; n++) {
          delete clone[actions[i].keysToRemove[n]];
        }
        result.push(clone);
        break;

      case 'clear':
        result.push({});
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
