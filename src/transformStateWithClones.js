'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const updateState = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const lastState = updateState[i - 1] || state;

    switch (true) {
      case (action.type === 'addProperties'): {
        const newState = {
          ...lastState,
          ...action.extraData,
        };

        updateState[i] = newState;

        break;
      }

      case (action.type === 'removeProperties'): {
        const newState = {
          ...{},
          ...lastState,
        };

        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete newState[key];
        }

        updateState[i] = newState;

        break;
      }

      case (action.type === 'clear'): {
        updateState[i] = {};

        break;
      }

      default: {
        break;
      }
    }
  }

  return updateState;
}

module.exports = transformStateWithClones;
