'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevStateCopy = { ...state };

  for (const action of actions) {
    let nextStateCopy = { ...prevStateCopy }; 

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          nextStateCopy =  Object.assign(nextStateCopy, action.extraData );
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete nextStateCopy[key]; 
          }
        }
        break;

      case 'clear':
        nextStateCopy = {}; 
        break;

      default:
        break;
    }

    result.push(nextStateCopy);   
    prevStateCopy = nextStateCopy;  
  }

  return result;
}

module.exports = transformStateWithClones;
