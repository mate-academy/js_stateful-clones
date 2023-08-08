'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultTransform = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const property in newState) {
          delete newState[property];
        }
        break;

      default:
        throw new Error('Error!');
    }
    resultTransform.push({ ...newState });
  }

  return resultTransform;
}

module.exports = transformStateWithClones;
