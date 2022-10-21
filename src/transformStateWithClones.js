'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const result = [];

  for (const item of actions) {
    switch (item.type) {
      case 'clear' :
        for (const prop of Object.keys(stateClone)) {
          delete stateClone[prop];
        }
        break;

      case 'removeProperties':
        for (let i = 0; i < item.keysToRemove.length; i++) {
          delete stateClone[item.keysToRemove[i]];
        }
        break;

      case 'addProperties' :
        Object.assign(stateClone, item.extraData);
        break;
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
