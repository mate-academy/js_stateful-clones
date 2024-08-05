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

  result.push(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      result.push(Object.assign(result, action.extraData));
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete result[action.keysToRemove[i]];
      }
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(result)) {
        if (result[key]) {
          delete result[key];
        }
      }
    }

    return result;
  }
}

module.exports = transformStateWithClones;
