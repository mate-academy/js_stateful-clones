'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const addProperty in extraData) {
          newState[addProperty] = extraData[addProperty];
        }
        break;
      case 'removeProperties':
        for (const removeProperty of keysToRemove) {
          delete newState[removeProperty];
        }
        break;
      case 'clear':
        for (const clearProperty in newState) {
          delete newState[clearProperty];
        }
        break;
      default:
        break;
    }
    result.push(newState);
    newState = { ...newState };
  }

  return result;
}

module.exports = transformStateWithClones;
