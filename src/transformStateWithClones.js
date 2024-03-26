'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const comand of actions) {
    if (comand.type === 'addProperties') {
      Object.assign(newState, comand.extraData);
    }

    if (comand.type === 'removeProperties') {
      for (const remove of comand.keysToRemove) {
        delete newState[remove];
      }
    }

    if (comand.type === 'clear') {
      newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
