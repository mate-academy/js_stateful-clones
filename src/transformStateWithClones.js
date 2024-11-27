'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addOption = 'addProperties';
  const removeOption = 'removeProperties';
  const clearOption = 'clear';
  const cloneState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case addOption:
        Object.assign(stateCopy, action.extraData);
        break;

      case removeOption:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case clearOption:
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('There is no options to change');
    }

    cloneState.push({ ...stateCopy });
  }

  return cloneState;
}

module.exports = transformStateWithClones;
