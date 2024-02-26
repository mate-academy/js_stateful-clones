'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const object = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(object, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(object, action.keysToRemove);
        break;
      case 'clear':
        clear(object);
        break;
    }

    stateHistory.push({ ...object });
  }

  return stateHistory;
}

function addProperties(object, extraData) {
  Object.assign(object, extraData);
}

function removeProperties(object, keysToRemove) {
  for (const key of keysToRemove) {
    delete object[key];
  }
}

function clear(object) {
  for (const key in object) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;
