'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayCloneState = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete cloneState[keyToRemove];
        }
        break;

      case 'clear':
        Object.keys(cloneState).forEach(key => delete cloneState[key]);
        break;

      default:
        break;
    };
    arrayCloneState.push({ ...cloneState });
  };

  return arrayCloneState;
}

module.exports = transformStateWithClones;
