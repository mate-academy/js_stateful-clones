'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const tempObj = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'clear') {
      for (const key in tempObj) {
        delete tempObj[key];
      }
    }

    if (actions[action].type === 'addProperties') {
      Object.assign(tempObj, actions[action].extraData);
    };

    if (actions[action].type === 'removeProperties') {
      for (let i = 0; i < actions[action].keysToRemove.length; i++) {
        delete tempObj[actions[action].keysToRemove[i]];
      };
    };
    resultArray.push({ ...tempObj });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
