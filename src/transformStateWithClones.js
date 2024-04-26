'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;
    }
  }

  function addProperties(arr, item) {
    stateHistory.push(Object.assign(arr, item));
    stateCopy = { ...arr };
  }

  function removeProperties(arr, item) {
    for (const key of item) {
      delete arr[key];
    }
    stateHistory.push(arr);
    stateCopy = { ...arr };
  }

  function clear(arr) {
    for (const key in arr) {
      delete arr[key];
    }

    stateHistory.push(arr);
    stateCopy = { ...arr };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
