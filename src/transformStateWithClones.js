'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        for (const key in action.extraData) {
          if (action.extraData.hasOwnProperty(key)) {
            currentState[key] = action.extraData[key];
          }
        }
        break;
      case 'removeProperties':
        const keysToRemove = new Set(action.keysToRemove);

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }
    result.push(Object.assign({}, currentState));
  }

  return result;
}
module.exports = transformStateWithClones;
