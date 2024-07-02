'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let lastState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        lastState = combineProperties(lastState, action.extraData);
        break;
      case 'removeProperties':
        lastState = removeProperties(lastState, action.keysToRemove);
        break;
      case 'clear':
        lastState = clearState(lastState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(lastState);
  }

  return history;
}

function combineProperties(state, properties) {
  return Object.assign({}, state, properties);
}

function removeProperties(state, properties) {
  const newState = {};
  const propertiesToKeep = Object.keys(state).filter((property) => {
    return !properties.includes(property);
  });

  for (const property of propertiesToKeep) {
    newState[property] = state[property];
  }

  return newState;
}

function clearState(state) {
  return {};
}

module.exports = transformStateWithClones;
