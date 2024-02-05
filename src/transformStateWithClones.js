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
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        addProperties(nextState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(nextState, action.keysToRemove);
        break;

      case 'clear':
        nextState = {};
        break;
    }

    result.push(nextState);
    currentState = { ...nextState };
  }

  return result;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
