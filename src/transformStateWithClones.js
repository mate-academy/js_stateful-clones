'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const allStates = [];
  const stateEdited = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateEdited, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateEdited[property];
        }
        break;

      case 'clear':
        Object.keys(stateEdited).forEach(key => delete stateEdited[key]);
        break;

      default:
        break;
    }
    allStates.push({ ...stateEdited });
  }

  return allStates;
}

module.exports = transformStateWithClones;
