'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':{
        Object.assign(stateCopy, extraData);
        break;
      }
      case 'removeProperties':{
        for (const item of keysToRemove) {
          delete stateCopy[item];
        }
        break;
      }
      case 'clear':{
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      }
      default:
      return stateCopy;
    }
    history.push({...stateCopy});
  }

  return history;
}

module.exports = transformStateWithClones;
