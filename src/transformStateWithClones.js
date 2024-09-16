'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}
module.exports = transformStateWithClones;
