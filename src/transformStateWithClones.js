'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.every((element) => delete newState[element]);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default: continue;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
