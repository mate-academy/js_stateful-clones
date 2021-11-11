'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectStates = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        for (const element in newState) {
          delete newState[element];
        }

        break;

      default:
        break;
    }

    objectStates[i] = newState;
    newState = { ...objectStates[i] };
  }

  return objectStates;
}

module.exports = transformStateWithClones;
