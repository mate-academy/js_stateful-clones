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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        result.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        result.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        result.push({ ...stateClone });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
