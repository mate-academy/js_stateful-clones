'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let prevState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    const nextState = { ...prevState };

    switch (type) {
      default:
        break;

      case 'addProperties':
        addProperties(nextState, extraData);
        break;

      case 'removeProperties':
        removeProperties(nextState, keysToRemove);
        break;

      case 'clear':
        clearState(nextState);
    }

    stateClones.push({ ...nextState });
    prevState = { ...nextState };
  }

  return stateClones;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    if (key in state) {
      delete state[key];
    }
  }
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
