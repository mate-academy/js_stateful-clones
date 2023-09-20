'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateClone[keyRemove];
        }
        break;

      case 'clear':
        for (const keyClone in stateClone) {
          delete stateClone[keyClone];
        }
        break;

      default:
        resultObject.push(stateClone);
    }

    resultObject.push({ ...stateClone });
  }

  return resultObject;
}

module.exports = transformStateWithClones;
