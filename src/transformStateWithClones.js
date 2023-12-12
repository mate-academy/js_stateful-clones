'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push({ ...newState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push({ ...newState });
        break;
      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
        result.push({ ...newState });
        break;
      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
