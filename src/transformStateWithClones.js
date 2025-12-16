'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  if (!Array.isArray(actions)) {
    return;
  }

  for (const action of actions) {
    if (!action || typeof action.type !== 'string') {
      continue;
    }

    switch (action.type) {
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          currentState = { ...currentState, ...action.extraData };
        }
        break;
      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          break;
        }

        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
