'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = []

  for (const action of actions) {
    switch(action.type) {
        case 'addProperties':
          stateCopy = { ...stateCopy, ...action.extraData}
          break;
    
        case 'removeProperties':
          action.keysToRemove.forEach((element) => delete stateCopy[element])
          break;

        case 'clear':
          for (const key in stateCopy) {
            delete stateCopy[key]
          }
          break;
        
        default:
          throw new Error('Error in switch case')
    }

    result.push({ ...stateCopy })
  }

  return result;
}

module.exports = transformStateWithClones;
