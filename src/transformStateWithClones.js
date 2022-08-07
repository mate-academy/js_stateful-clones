'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfState = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action);
        break;

      case 'removeProperties':
        removeProperties(currentState, action);
        break;

      case 'clear':
        clear(currentState);
        break;

      default: return 'Wrong type';
    }

    arrayOfState.push({ ...currentState });
  }

  return arrayOfState;

  function addProperties(initialState, { extraData }) {
    Object.assign(initialState, extraData);
  }

  function removeProperties(initialState, { keysToRemove }) {
    for (const property of keysToRemove) {
      if (initialState.hasOwnProperty(property)) {
        delete initialState[property];
      }
    }
  }

  function clear(initialState) {
    for (const feature in initialState) {
      delete initialState[feature];
    }
  }
}

module.exports = transformStateWithClones;
