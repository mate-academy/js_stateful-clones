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

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, actions[action].extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const removable in actions[action].keysToRemove) {
          delete stateClone[actions[action].keysToRemove[removable]];
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
