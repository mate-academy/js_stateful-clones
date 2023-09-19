'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */


function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const stateCopy = Object.assign({}, state);
  for (const action of  actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperty':
       for (const prop of action.keysToRemove) {
        delete stateCopy[prop];
        break;
       }

       case 'clear':
        for (key in stateCopy) {
          delete stateCopy[key];
        }


    }

    arrayResult.push({...stateCopy});
  }
  return arrayResult;
}


module.exports = transformStateWithClones;
