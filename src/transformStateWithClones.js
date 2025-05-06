'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let copy = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
    } else if (action.type === 'clear') {
      copy = {};
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    }

    result.push(copy);
    currentState = copy;
  }

  return result;
}

module.exports = transformStateWithClones;
