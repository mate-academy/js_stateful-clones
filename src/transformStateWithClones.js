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
      case 'addProperties': {
        const { extraData } = action;
        const newState = {
          ...lastState, ...extraData,
        };

        lastState = newState;

        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;
        const newState = { ...lastState };

        for (const key of keysToRemove) {
          delete newState[key];
        }

        lastState = newState;

        break;
      }

      case 'clear': {
        lastState = {};

        break;
      }

      default : {
        throw new Error(`Unknown type of action: ${action.type}`);
      }
    }

    history.push(lastState);
  }

  return history;
}

module.exports = transformStateWithClones;
