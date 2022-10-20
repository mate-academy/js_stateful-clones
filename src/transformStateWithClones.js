'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': Object.assign(copyState, action.extraData);
        newStates.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete copyState[removeKey];
        }
        newStates.push({ ...copyState });
        break;

      case 'clear': for (const key in copyState) {
        delete copyState[key];
      }
        newStates.push({ ...copyState });
        break;

      default: return state;
    }
  }

  return newStates;
}

module.exports = transformStateWithClones;
