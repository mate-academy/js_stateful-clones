'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clonedStates = [];
  const clonedState = { ...state };

  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(clonedState, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          if (clonedState.hasOwnProperty(key)) {
            delete clonedState[key];
          }
        }
        break;

      case CLEAR:
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;
    }

    clonedStates.push({ ...clonedState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
