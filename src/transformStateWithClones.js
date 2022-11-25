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
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`${action} is not supported`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
