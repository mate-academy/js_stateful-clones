'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let copy = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    }

    if (action.type === 'clear') {
      copy = {};
    }

    history.push(copy);
    currentState = copy;
  }

  return history;
}

module.exports = transformStateWithClones;
