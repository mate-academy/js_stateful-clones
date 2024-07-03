'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let previousState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        previousState = createStateWithAddedProperties(
          previousState,
          action.extraData,
        );
        break;
      case 'removeProperties':
        previousState = createStateWithRemovedProperties(
          previousState,
          action.keysToRemove,
        );
        break;
      case 'clear':
        previousState = createClearState(previousState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...previousState });
  }

  return history;
}

function createStateWithAddedProperties(state, properties) {
  return Object.assign({}, state, properties);
}

function createStateWithRemovedProperties(state, properties) {
  const newState = { ...state };

  for (const property of properties) {
    delete newState[property];
  }

  return newState;
}

function createClearState(state) {
  return {};
}

module.exports = transformStateWithClones;
