'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const act of actions) {
    let newState;

    switch (act.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...currentState,
          ...(act.extraData || {}),
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of act.keysToRemove || []) {
          delete newState[key];
        }
        break;

      default:
        newState = { ...currentState };
    }

    history.push({ ...newState });
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
