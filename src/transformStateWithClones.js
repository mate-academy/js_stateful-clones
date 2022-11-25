'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
       for (const key of action.keysToRemove) {
       delete clone[key];
      }
    }


    if (action.type === 'clear') {
      for (const value in clone) {
        delete clone[value];
      }
    }
    
    arr.push({ ...clone });
  }
  return arr
}

module.exports = transformStateWithClones;
