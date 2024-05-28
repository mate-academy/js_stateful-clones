'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    let stateCopy = { ...state }; 

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {}; 
        break;
    }

    result.push(stateCopy);
    state = stateCopy; 
  }

  return result;
}


module.exports = transformStateWithClones;
