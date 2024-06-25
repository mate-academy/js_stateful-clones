'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(currentState, stateCopy, action.keysToRemove);
        break;
      case 'clear':
        clear(currentState, stateCopy);
        break;
      default:
        break;
    }
  }

  return currentState;

  function addProperties(newState, oldState, properties) {
    Object.assign(oldState, properties);

    const newStateObject = Object.assign({}, oldState);

    newState.push(newStateObject);
  }

  function removeProperties(newState, oldState, removeKeys) {
    for (const key of removeKeys) {
      delete oldState[key];
    }

    const newStateObject = Object.assign({}, oldState);

    newState.push(newStateObject);
  }

  function clear(newState, oldState) {
    for (const key in oldState) {
      delete oldState[key];
    }

    const newStateObject = Object.assign({}, oldState);

    newState.push(newStateObject);
  }
}

module.exports = transformStateWithClones;
