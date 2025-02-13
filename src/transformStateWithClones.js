'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const transformedState = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (const removedProperty of keysToRemove) {
          delete stateCopy[removedProperty];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return `Unknown action type: ${type}`;
    }
    transformedState.push({ ...stateCopy });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
