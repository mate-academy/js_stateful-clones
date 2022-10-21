'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear' :
        for (const property in stateClone) {
          delete stateClone[property];
        }
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        }
        break;

      case 'addProperties' :
        Object.assign(stateClone, action.extraData);
        break;

      default: {
        throw new Error('Error. Check input');
      }
    }
    resultState.push({ ...stateClone });
  }

  return resultState;
}

module.exports = transformStateWithClones;
