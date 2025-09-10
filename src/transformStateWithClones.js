'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let transformedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        transformedState = addProperties(transformedState, action.extraData);
        break;

      case 'removeProperties':
        transformedState = removeProperties(
          transformedState,
          action.keysToRemove,
        );
        break;

      case 'clear':
        transformedState = clearProperties();
        break;
    }
    history.push({ ...transformedState });
  }

  return history;
}

function addProperties(state, extraData) {
  const newState = {};

  Object.assign(newState, state, extraData);

  return newState;
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearProperties() {
  return {};
}

module.exports = transformStateWithClones;
