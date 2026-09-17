'use strict';

const ACTION_CLEAR = 'clear';
const ACTION_ADD_PROPERTIES = 'addProperties';
const ACTION_REMOVE_PROPERTIES = 'removeProperties';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  if (
    state === null ||
    typeof state !== 'object' ||
    Array.isArray(state) ||
    !Array.isArray(actions)
  ) {
    return [];
  }

  let currentState = { ...state };

  return actions.map((action) => {
    switch (action.type) {
      case ACTION_CLEAR:
        currentState = {};
        break;

      case ACTION_ADD_PROPERTIES:
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case ACTION_REMOVE_PROPERTIES:
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        currentState = { ...currentState };
    }

    return currentState;
  });
}

module.exports = transformStateWithClones;
