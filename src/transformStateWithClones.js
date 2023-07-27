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
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        result.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        result.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
      default:
        throw new Error(`Error: ${action.type}`);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
