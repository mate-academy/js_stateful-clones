'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let curentState = { ...state };

  for (const action of actions) {
    const { type = null, extraData = {}, keysToRemove = [] } = action;

    switch (type) {
      case 'addProperties':
        addProperties(curentState, extraData);
        break;
      case 'removeProperties':
        removeProperties(curentState, keysToRemove);
        break;
      case 'clear':
        clear(curentState);
        break;
    }

    stateHistory.push(curentState);

    curentState = { ...curentState };
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
