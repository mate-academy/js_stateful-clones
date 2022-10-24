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
    const { type, extraData, keysToRemove } = part;

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
        for (const key in stateCopy) {
          delete stateCopy[key];
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
