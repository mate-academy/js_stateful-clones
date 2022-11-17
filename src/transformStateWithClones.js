'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let resultState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in resultState) {
          delete resultState[key];
        }
        break;

      case 'addProperties':
        resultState = Object.assign(resultState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in resultState) {
            delete resultState[keyToRemove];
          }
        }
        break;
    }

    resultArray.push({ ...resultState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
