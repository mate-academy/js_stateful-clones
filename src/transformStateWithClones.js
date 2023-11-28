'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultingArray = [];
  const clone = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      resultingArray.push(Object.assign({}, clone, action.extraData));
    }

    if (action.type === 'removeProperties') {
      for (const key of Object.entries(action.keysToRemove)) {
        delete clone[key[1]];
      }

      resultingArray.push(Object.assign({}, clone));
    }

    if (action.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }

      resultingArray.push(Object.assign({}, clone));
    }
  }

  return resultingArray;
}

module.exports = transformStateWithClones;
