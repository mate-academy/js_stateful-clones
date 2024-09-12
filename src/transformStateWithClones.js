'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionTypes = {
    addProperties: 'addProperties',
    removeProperties: 'removeProperties',
    clear: 'clear',
  };
  const newState = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case actionTypes.addProperties:
        Object.assign(currentState, action.extraData);
        break;

      case actionTypes.removeProperties:
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case actionTypes.clear:
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        break;
    }

    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;
