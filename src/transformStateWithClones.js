'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete stateClone[item];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      default:
        throw new Error('Incorrect action type');
    }
    resultArray.push(Object.assign({}, stateClone));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
