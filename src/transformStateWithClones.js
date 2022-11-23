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
    switch (action.type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const removable in action.keysToRemove) {
          delete stateClone[action.keysToRemove[removable]];
        }
        break;

      case 'clear':
        stateClone = { ...stateClone };
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;
    }
    result.push(stateClone);
  }

  return result;
}

module.exports = transformStateWithClones;
