'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let lastState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        const newState = Object.assign({}, { ...lastState }, extraData);

        lastState = newState;
        break;

      case 'removeProperties':
        const { keysToRemove } = action;
        const stateToRemove = { ...lastState };

        for (const key of keysToRemove) {
          delete stateToRemove[key];
        }

        lastState = stateToRemove;
        break;

      case 'clear':
        lastState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push(lastState);
  }

  return history;
}

module.exports = transformStateWithClones;
