'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  let newState = {};
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        newState = { ...copyState };
        break;
    }
    result.push(newState);
    copyState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
