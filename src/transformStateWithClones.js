'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let lastState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        const lastExtraCopy = {
          ...lastState, ...extraData,
        };

        lastState = lastExtraCopy;
        break;

      case 'removeProperties':
        const { keysToRemove } = action;
        const lastStateCopy = { ...lastState };

        for (const value of keysToRemove) {
          delete lastStateCopy[value];
        }
        lastState = lastStateCopy;

        break;

      case 'clear':
        const stateEmpty = {};

        lastState = stateEmpty;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push(lastState);
  }

  return history;
}

module.exports = transformStateWithClones;
