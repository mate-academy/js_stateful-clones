'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const cloneHistory = [];

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties':
        for (const keysRemove of action.keysToRemove) {
          delete stateClone[keysRemove];
        }

        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
      default: return 'Unknown action type';
    }
    cloneHistory.push({ ...stateClone });
  }

  return cloneHistory;
}

module.exports = transformStateWithClones;
