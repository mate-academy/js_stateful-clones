'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allActionsState = [];
  const stateCopy = { ...state };

  for (const part of actions) {
    const { type } = part;
    const { extraData } = part;
    const { keysToRemove } = part;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const removeKeys of keysToRemove) {
          delete stateCopy[removeKeys];
        }

        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;

      default:
        throw new Error('Invalid action');
    }

    allActionsState.push({ ...stateCopy });
  }

  return allActionsState;
}

module.exports = transformStateWithClones;
