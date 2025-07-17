'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];

  let copyState = { ...state };

  for (const obj of actions) {
    let temporaryState = { ...copyState };

    if (obj.type === 'addProperties') {
      Object.assign(temporaryState, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete temporaryState[key];
      }
    } else if (obj.type === 'clear') {
      temporaryState = {};
    }

    copyState = temporaryState;
    result.push(temporaryState);
  }

  return result;
}

module.exports = transformStateWithClones;
