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
      case 'addProperties' : {
        const { extraData } = action;
        const newState = {
          ...lastState, ...extraData,
        };

        lastState = newState;
        history.push(newState);

        break;
      }

      case 'removeProperties' : {
        const { keysToRemove } = action;
        const newState = { ...lastState };

        for (const key of keysToRemove) {
          delete newState[key];
        }

        lastState = newState;
        history.push(newState);

        break;
      }

      case 'clear' : {
        lastState = {};
        history.push(lastState);

        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
  }

  return history;
}

module.exports = transformStateWithClones;
