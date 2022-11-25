'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const stateTransform = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = { ...stateClone };

        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    stateTransform.push(stateClone);
  }

  return stateTransform;
}

module.exports = transformStateWithClones;
