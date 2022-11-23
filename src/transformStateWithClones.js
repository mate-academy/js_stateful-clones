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

  for (const keys in actions) {
    switch (actions[keys].type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, actions[keys].extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const removable in actions[keys].keysToRemove) {
          delete stateClone[actions[keys].keysToRemove[removable]];
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
