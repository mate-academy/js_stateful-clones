'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let previousState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        previousState = combineProperties(previousState, action.extraData);
        break;
      case 'removeProperties':
        previousState = removeProperties(previousState, action.keysToRemove);
        break;
      case 'clear':
        previousState = clearState(previousState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(previousState);
  }

  return history;
}

function combineProperties(state, properties) {
  return Object.assign({}, state, properties);
}

function removeProperties(state, properties) {
  const newState = { ...state };

  for (const property of properties) {
    delete newState[property];
  }

  return newState;
}

function clearState(state) {
  return {};
}

module.exports = transformStateWithClones;
