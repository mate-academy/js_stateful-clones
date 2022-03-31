'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let currentState = { ...state };
  let keys = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        currentState = Object.assign(currentState, act.extraData);
        break;

      case 'removeProperties':
        keys = act.keysToRemove;

        for (const key of keys) {
          delete currentState[key];
        }
        break;

      default:
        currentState = {};
    }

    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;
