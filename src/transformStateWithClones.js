'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];

  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    const lastState = result[index - 1] || state;

    switch (action.type) {
      case 'addProperties': {
        const newState = {
          ...lastState,
          ...action.extraData,
        };

        result[index] = newState;

        break;
      }

      case 'removeProperties': {
        const newState = Object.assign({}, lastState);

        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete newState[key];
        }

        result[index] = newState;
        break;
      }

      case 'clear': {
        result[index] = {};
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
