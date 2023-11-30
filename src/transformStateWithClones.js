'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
    }

    const resultObject = { ...stateClone };

    resultArray.push(resultObject);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
