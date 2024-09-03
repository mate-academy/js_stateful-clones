'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArr = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateCopy[property];
        }
        break;

      default:
        return null;
    }

    statesArr.push({ ...stateCopy });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
