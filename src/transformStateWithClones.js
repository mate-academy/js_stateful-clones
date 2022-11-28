'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateClonesArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const property in stateClone) {
          delete stateClone[property];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;

      default:
        continue;
    }
    stateClonesArr.push({ ...stateClone });
  }

  return stateClonesArr;
}

module.exports = transformStateWithClones;
