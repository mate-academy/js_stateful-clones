'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {...state};
  const cloneHistory = [];

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        cloneHistory.push({ ...stateClone })
        break;

      case 'removeProperties':
        for (const keysRemove of action.keysToRemove) {
          delete stateClone[keysRemove];
        }

        cloneHistory.push({ ...stateClone })
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        cloneHistory.push({ ...stateClone })
        break;
      default: return 'Unknown action type';
    }
  }

  return cloneHistory;
}

module.exports = transformStateWithClones;
