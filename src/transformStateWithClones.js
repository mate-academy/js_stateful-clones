'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [
    {
      ...state,
    },
  ];

  for (let i = 0; i < actions.length; i++) {
    if (i !== 0) {
      stateClones[i] = Object.assign({}, stateClones[i - 1]);
    }

    switch (actions[i].type) {
      case 'addProperties':
        for (const addKey in actions[i].extraData) {
          stateClones[i][addKey] = actions[i].extraData[addKey];
        }

        break;
      case 'removeProperties':
        for (const removeKey of actions[i].keysToRemove) {
          delete stateClones[i][removeKey];
        }

        break;

      case 'clear':
        stateClones[i] = {};

        break;

      default:
        return; // for unexpected error handling.
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
