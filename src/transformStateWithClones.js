'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrClone = [];
  const stateCop = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        stateCop[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCop[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCop) {
        delete stateCop[key];
      }
    }
    arrClone.push({ ...stateCop });
  }

  return arrClone;
}

module.exports = transformStateWithClones;
