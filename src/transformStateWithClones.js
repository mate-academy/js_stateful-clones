'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let mutatedClone = Object.assign(state);

  for (const key of actions) {
    if (key.type === 'clear') {
      mutatedClone = {};
    }

    if (key.type === 'addProperties') {
      mutatedClone = Object.assign({}, mutatedClone, key.extraData);
    }

    if (key.type === 'removeProperties') {
      mutatedClone = Object.assign({}, mutatedClone);

      for (const removeItem of key.keysToRemove) {
        if (removeItem in mutatedClone) {
          delete mutatedClone[removeItem];
        }
      }
    }

    result.push(mutatedClone);
  }

  return result;
}
module.exports = transformStateWithClones;
