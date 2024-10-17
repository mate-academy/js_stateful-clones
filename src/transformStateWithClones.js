'use strict';

/**
 * @param {Object}  currentState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        currentState = {};
        break;
      }

      case 'addProperties': {
        currentState = { ...currentState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;
      }

      default:
        // eslint-disable-next-line no-console
        console.warn(`Неизвестный тип действия: ${action.type}`);
        break;
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
