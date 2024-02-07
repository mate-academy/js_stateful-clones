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
        result.push(newState);
        break;

      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        result.push(newState);
        break;

      case 'clear':
        newState = clear(newState);
        result.push(newState);
        break;
    }
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

  if (Object.keys(newState).length === 0) {
    return newState;
  }

  return newState;
}

function clear(state) {
  const newState = { ...state };

  for (const key in newState) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
