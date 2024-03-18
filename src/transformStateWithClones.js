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

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        result.push({ ...currentState });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        result.push({ ...currentState });
        break;
      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
      default:
        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
