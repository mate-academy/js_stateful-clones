'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(clonedState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(clonedState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(clonedState);
        break;

      default:
        throw new Error('Unknown action type');
    }

    result.push(Object.assign({}, clonedState));
  }

  return result;
}

function addProperties(clonedState, extraData) {
  Object.assign(clonedState, extraData);
}

function removeProperties(clonedState, keysToRemove) {
  for (const key of keysToRemove) {
    delete clonedState[key];
  }
}

function clearProperties(clonedState) {
  for (const key in clonedState) {
    delete clonedState[key];
  }
}

module.exports = transformStateWithClones;
