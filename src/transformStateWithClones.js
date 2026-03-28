'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateClone = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          addProperties(stateClone, action.extraData);
          break;
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          removeProperties(stateClone, action.keysToRemove);
          break;
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        // Помилку видавать тести не дають (і преттіер)
        break;
    }

    res.push(stateClone);
    currentState = stateClone;
  }

  return res;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

// function clearProperties(state) {
//   for (const key in state) {
//     delete state[key];
//   }
// }

module.exports = transformStateWithClones;
