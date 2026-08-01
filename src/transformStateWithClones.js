'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateChangeFlow = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        clearWholeState(stateCopy);
        break;
      case 'addProperties':
        addNewProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeUndesiredProperties(stateCopy, action.keysToRemove);
        break;
      default:
        throw new Error(`Not a valid data was given!`);
    }

    stateChangeFlow.push({ ...stateCopy });
  }

  return stateChangeFlow;
}

function clearWholeState(state) {
  for (const key in state) {
    delete state[key];
  }
}

function addNewProperties(state, extraData) {
  for (const [key, value] of Object.entries(extraData)) {
    Object.assign(state, { [key]: value });
  }
}

function removeUndesiredProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
