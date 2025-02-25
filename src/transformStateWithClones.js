'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const y of action.keysToRemove) {
          delete newState[y];
        }
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
