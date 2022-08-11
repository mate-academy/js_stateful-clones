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
        resultArray.push({});
        break;

      case 'addProperties':
        resultState = Object.assign(resultState, action.extraData);
        resultArray.push({ ...resultState });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in resultState) {
            delete resultState[keyToRemove];
          }
        }
        resultArray.push({ ...resultState });
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
