'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let total = { ...state };

  for (const type of actions) {
    let firstTotal = { ...total };

    if (type.type === 'addProperties') {
      Object.assign(firstTotal, type.extraData);
    }

    if (type.type === 'removeProperties') {
      for (const key of type.keysToRemove) {
        delete firstTotal[key];
      }
    }

    if (type.type === 'clear') {
      firstTotal = {};
    }

    result.push(firstTotal);
    total = firstTotal;
  }

  return result;
}

module.exports = transformStateWithClones;
