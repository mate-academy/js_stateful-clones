'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = {};
  const states = [];

  for (const key in state) {
    clone[key] = state[key];
  }

  for (const action of actions) {
    // const { type, extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        addProperties(clone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(clone, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(clone);
        break;
    }

    states.push({ ...clone });
  }

  return states;
}

function addProperties(clone, extraData) {
  Object.assign(clone, extraData);
}

function removeProperties(clone, keysToRemove) {
  for (const key of keysToRemove) {
    delete clone[key];
  }
}

function clearProperties(clone) {
  for (const key in clone) {
    delete clone[key];
  }
}

module.exports = transformStateWithClones;
