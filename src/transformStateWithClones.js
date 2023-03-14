'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;
      case 'clear':
        for (const removedItem in stateCopy) {
          delete stateCopy[removedItem];
        }
        break;

      case 'removeProperties':
        for (const del of action.keysToRemove) {
          delete stateCopy[del];
        }
    }
    resultArray.push({ ...stateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
