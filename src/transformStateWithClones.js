'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const referenceState = { ...state };

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':
        Object.assign(referenceState, property.extraData);
        break;

      case 'removeProperties':
        for (const key of property.keysToRemove) {
          delete referenceState[key];
        }
        break;

      case 'clear':
        for (const key in referenceState) {
          delete referenceState[key];
        }
        break;

      default:
        throw Error;
    }

    result.push({ ...referenceState });
  }

  return result;
}

module.exports = transformStateWithClones;
