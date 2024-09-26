'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    cloneState = { ...cloneState };

    switch (type) {
      case 'addProperties':
        for (const prop in extraData) {
          cloneState[prop] = extraData[prop];
        }
        break;

      case 'removeProperties':
        for (const prop of keysToRemove) {
          delete cloneState[prop];
        }
        break;

      case 'clear':
        for (const prop in cloneState) {
          delete cloneState[prop];
        }
        break;

      default:
        break;
    }

    result.push(cloneState);
  }

  return result;
}

module.exports = transformStateWithClones;
