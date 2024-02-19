'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
      case 'clear':
        clearProperties(stateCopy);
    }

    result.push({ ...stateCopy });
  }

  return result;
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
