'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultAllState = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          currentState = addProperties(currentState, action.extraData);
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          currentState = removeProperties(currentState, action.keysToRemove);
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }

    const copyState = { ...currentState };

    resultAllState.push(copyState);
  }

  return resultAllState;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
