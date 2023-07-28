'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = Object.assign({}, state);

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }

        break;
      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;

        break;
      default:
        throw new Error(`Error: ${action.type}`);
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
