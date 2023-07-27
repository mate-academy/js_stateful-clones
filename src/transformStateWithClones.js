'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;
      default:
        throw new Error('Something went wrong !');
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
