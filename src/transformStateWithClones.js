'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const lastState = result[i - 1] || state;
    let newState;

    switch (action.type) {
      case 'addProperties': {
        newState = {
          ...lastState,
          ...action.extraData,
        };

        break;
      }

      case 'removeProperties': {
        newState = {
          ...lastState,
        };

        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete newState[key];
        }

        break;
      }

      case 'clear': {
        newState = {};

        break;
      }
    }

    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
