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
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push({ ...newState });
        break;

      case 'removeProperties':
        action.keysToRemove.every((element) => delete newState[element]);
        result.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        result.push({ ...newState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
