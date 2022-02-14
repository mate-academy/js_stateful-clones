'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let arrayResult = { ...state };

  for (const change of actions) {
    switch (change.type) {
      case 'addProperties':
        Object.assign(arrayResult, change.extraData);
        break;

      case 'removeProperties':
        for (const key of change.keysToRemove) {
          delete arrayResult[key];
        }
        break;

      case 'clear':
        arrayResult = {};
        break;
    }
    newArray.push({ ...arrayResult });
  }

  return newArray;
}

module.exports = transformStateWithClones;
