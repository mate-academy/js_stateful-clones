'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(function (key) {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        for (const key in stateCopy) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        break;
    }

    currentState.push({ ...stateCopy });
  }

  return currentState;
}

module.exports = transformStateWithClones;
