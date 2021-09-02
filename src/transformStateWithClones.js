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

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          stateCopy[key] = item.extraData[key];
        };
        break;

      case 'removeProperties':
        for (const key in item.keysToRemove) {
          delete stateCopy[item.keysToRemove[key]];
        };
        break;

      case 'clear':
        stateCopy = {};
    }
    resultArray.push({ ...stateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
