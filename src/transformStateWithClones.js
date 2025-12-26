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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        currentState = nextState;
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
