'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        stateCopy[key] = actions[i].extraData[key];
      }
      resultArray.push({ ...stateCopy });
    } else if (actions[i].type === 'removeProperties') {
      for (let y = 0; y < actions[i].keysToRemove.length; y++) {
        delete stateCopy[actions[i].keysToRemove[y]];
      }
      resultArray.push({ ...stateCopy });
    } else if (actions[i].type === 'clear') {
      stateCopy = {};
      resultArray.push({ ...stateCopy });
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
