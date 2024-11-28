'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = Object.assign({}, state);

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        stateCopy = Object.assign({}, stateCopy, key.extraData);
        break;

      case 'removeProperties':
        stateCopy = Object.assign({}, stateCopy);

        for (const rem of key.keysToRemove) {
          delete stateCopy[rem];
        }
        break;
        
      case 'clear':
        stateCopy = {};
        break;
    }
    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
