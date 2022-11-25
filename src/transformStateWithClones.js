'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  const stateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const element of action.keysToRemove) {
          delete stateCopy[element];
        }
        break;

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    allStates.push({ ...stateCopy });
  }

  return allStates;
}

module.exports = transformStateWithClones;
