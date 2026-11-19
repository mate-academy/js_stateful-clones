'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const stateCopy = { ...state };
  const ret = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((el) => {
          delete stateCopy[el];
        });
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((el) => {
          delete stateCopy[el];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    ret.push({ ...stateCopy });
  }

  return ret;
}

module.exports = transformStateWithClones;
