'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    stateClone = { ...stateClone };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const removable in action.keysToRemove) {
          delete stateClone[action.keysToRemove[removable]];
        }
        break;

      case 'clear':
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;
    }
    result.push(stateClone);
  }

  return result;
}

module.exports = transformStateWithClones;
