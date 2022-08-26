'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  const currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type } = actions[i];

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(actions[i].extraData)) {
          currentState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (currentState[key]) {
            delete currentState[key];
          }
        }
        break;

      default:
        if (currentState) {
          for (const key of Object.keys(currentState)) {
            delete currentState[key];
          }
        }
    }

    stateClone.push({ ...currentState });
  }

  return stateClone;
}

module.exports = transformStateWithClones;
