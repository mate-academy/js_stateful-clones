'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = addProperties({ ...stateCopy }, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties({ ...stateCopy }, action.keysToRemove);
        break;

      default:
        break;
    }
    states.push(stateCopy);
  }

  return states;
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

module.exports = transformStateWithClones;
