'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArr = [];
  let newState = { ...state };

  for (const action of actions) {
    newState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        statesArr.push(addProperties(newState, action.extraData));
        break;

      case 'removeProperties':
        statesArr.push(removeProperties(newState, action.keysToRemove));
        break;

      case 'clear':
        statesArr.push(clearProperties(newState));
        break;
      default:
        throw new Error('action.type not found');
    }
  }

  return statesArr;
}

function addProperties(state, extraData) {
  return Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
