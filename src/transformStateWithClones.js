'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        currentState = addProperties(currentState, actions[i].extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, actions[i].keysToRemove);
        break;

      case 'clear':
        currentState = {};
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

function addProperties(currentState, extraData) {
  Object.assign(currentState, extraData);

  return currentState;
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }

  return currentState;
}

// function clearAllProperties(currentState) {
//   for (const key in Object.keys(currentState)) {
//     delete currentState[key];
//   }

//   return currentState;
// }

module.exports = transformStateWithClones;
