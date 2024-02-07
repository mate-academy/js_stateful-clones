'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        newState = addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        break;

      case 'clear':
        newState = clear(newState);
        break;
    }

    result.push(newState);
  }

  return result;
}

function addProperties(state, extraData) {
  return {
    ...state,
    ...extraData,
  };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  if (keysToRemove.length === 0) {
    return newState;
  }

  for (const key of keysToRemove) {
    if (key in newState) {
      delete newState[key];
    }
  }

  return newState;
}

function clear(state) {
  return {};
}

module.exports = transformStateWithClones;
