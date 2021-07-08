'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const temporary = { ...state };

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(temporary, actions[key].extraData);
    }

    if (actions[key].type === 'removeProperties') {
      for (let i = 0; i < actions[key].keysToRemove.length; i++) {
        delete temporary[actions[key].keysToRemove[i]];
      }
    }

    if (actions[key].type === 'clear') {
      for (const j in temporary) {
        delete temporary[j];
      }
    }
    resultArray.push({ ...temporary });
  }

  return resultArray;
};

module.exports = transformStateWithClones;
