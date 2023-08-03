'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultatTransformState = [];
  const newState = { ...state };

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
        for (const keyState in newState) {
          if (newState.hasOwnProperty(keyState)) {
            delete newState[keyState];
          }
        }
        break;

      default:
        return `Unknown action: ${action.type}`;
    }

    resultatTransformState.push({ ...newState });
  }

  return resultatTransformState;
}

module.exports = transformStateWithClones;
