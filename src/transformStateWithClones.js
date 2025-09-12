'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let history = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch(type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
      break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
      break;
      default:
        stateCopy = {}
    }

    history.push({ ...stateCopy})
  }

  return history
}

module.exports = transformStateWithClones;
