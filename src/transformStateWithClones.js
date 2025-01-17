'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = [state];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = addProperties(newState, action.extraData);
        break;
      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        break;
      case 'clear':
        newState = clearObj(newState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  return newState;
}

function addProperties(state, extraData) {
  if (Object.keys(state[0]).length === 0) {
    return [{ ...extraData }];
  }

  if (state.length === 1) {
    return [{ ...state[0], ...extraData }];
  }

  return [...state, { ...state[state.length - 1], ...extraData }];
}

function removeProperties(state, keysToRemove) {
  if (state.length === 1) {
    const lastItem = { ...state[state.length - 1] };

    // Remove specified keys
    keysToRemove.forEach((key) => {
      delete lastItem[key];
    });

    if (Object.keys(lastItem).length === 0) {
      return [{}];
    } else {
      return [lastItem];
    }
  }

  const newItem = { ...state[state.length - 1] };

  // Remove specified keys
  keysToRemove.forEach((key) => {
    delete newItem[key];
  });

  // Return a new state array with the updated object
  return [...state, newItem];
}

function clearObj(state) {
  if (state.length === 1) {
    return [{}];
  }

  return [...state, {}]; // Append an empty object
}
module.exports = transformStateWithClones;
