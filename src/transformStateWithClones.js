'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const actionsArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const word of action.keysToRemove) {
          delete stateClone[word];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        };
        break;
    }
    actionsArray.push({ ...stateClone });
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
