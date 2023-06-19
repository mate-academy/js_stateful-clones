'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case action.type === 'removeProperties':
        const actionKeysToRemove = action.keysToRemove;

        for (let i = 0; i < actionKeysToRemove.length; i++) {
          delete stateCopy[action.keysToRemove[i]];
        }
        break;

      case action.type === 'clear':
        for (const keyState in stateCopy) {
          delete stateCopy[keyState];
        }
        break;

      default:
        return;
    }
    const stateCopytoArray = { ...stateCopy };
    result.push(stateCopytoArray);
  }

  return result;
}

module.exports = transformStateWithClones;
