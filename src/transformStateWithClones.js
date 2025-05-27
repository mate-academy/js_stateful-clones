'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArr = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateCopy = { ...stateCopy, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      stateCopy = { ...stateCopy };

      for (const key in stateCopy) {
        if (action.keysToRemove.includes(key)) {
          delete stateCopy[key];
        }
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }
    finalArr.push({ ...stateCopy });
  }

  return finalArr;
}

module.exports = transformStateWithClones;
