'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrState = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const member in newState) {
          delete newState[member];
        }
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          if (newState.hasOwnProperty(action.keysToRemove[key])) {
            delete newState[action.keysToRemove[key]];
          }
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
    }
    arrState.push({ ...newState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
