'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateResult = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.map((key) => delete stateCopy[key]);
        break;

      default:
        Object.keys(stateCopy).map((key) => delete stateCopy[key]);
        break;
    }
    stateResult.push({ ...stateCopy });
  }

  return stateResult;
}

module.exports = transformStateWithClones;
