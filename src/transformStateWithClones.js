'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const addedState = action.extraData;

        clonedState = {
          ...clonedState, ...addedState,
        };
        break;
      };

      case 'removeProperties': {
        for (const keyRemove of action.keysToRemove) {
          if (clonedState[keyRemove]) {
            delete clonedState[keyRemove];
          }
        }
        break;
      }

      case 'clear': {
        for (const clearKey in clonedState) {
          delete clonedState[clearKey];
        };
        break;
      }
    }
    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
