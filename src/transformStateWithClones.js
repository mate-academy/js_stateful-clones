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
    const { extraData } = actions[i];
    const keysToRemove = actions[i].keysToRemove;
    const stateObjectKeys = Object.keys(currentState);

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          currentState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (currentState[key]) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        if (currentState) {
          for (const key of stateObjectKeys) {
            delete currentState[key];
          }
        }
        break;

      default:
        return 'Input not valid';
    }

    stateClone.push({ ...currentState });
  }

  return stateClone;
}

module.exports = transformStateWithClones;
