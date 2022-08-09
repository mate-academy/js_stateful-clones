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
      case 'addProperties': {
        const { extraData } = action;

        const stateCopy = {
          ...lastState, ...extraData,
        };

        lastState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;
        const stateCopy = { ...lastState };

        for (const value of keysToRemove) {
          delete stateCopy[value];
        }
        lastState = stateCopy;

        break;
      }

      case 'clear': {
        const stateEmpty = {};

        lastState = stateEmpty;
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    history.push(lastState);
  }

  return history;
}

module.exports = transformStateWithClones;
