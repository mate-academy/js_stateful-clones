'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          if (stateCopy.hasOwnProperty(property)) {
            delete stateCopy[property];
          }
        }
        break;

      default:
        throw new Error('Invalid action type.');
    }

    const toPush = { ...stateCopy };

    result.push(toPush);
  }

  return result;
}

module.exports = transformStateWithClones;
