'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];

  for (const action of actions) {
    const lastState =
      stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : state;
    let newState = {};

    switch (action.type) {
      case 'addProperties':
        newState = addProperties(lastState, action.extraData);
        break;
      case 'removeProperties':
        newState = removeProperties(lastState, action.keysToRemove);
        break;
      case 'clear':
        newState = clearState();
        break;
      default:
        throw new Error(`Sorry but try a different type of actions.`);
    }
    stateHistory.push(newState);
  }

  return stateHistory;
}

function addProperties(state, properties) {
  const stateCopy = { ...state };

  for (const prop in properties) {
    stateCopy[prop] = properties[prop];
  }

  return stateCopy;
}

function removeProperties(state, properties) {
  const stateCopy = { ...state };

  for (const prop of properties) {
    delete stateCopy[prop];
  }

  return stateCopy;
}

function clearState() {
  return {};
}

module.exports = transformStateWithClones;
