'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        const keysToRemove = action.keysToRemove || [];

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
