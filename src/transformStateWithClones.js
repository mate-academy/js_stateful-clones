'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newObj = { ...state };
  const stateHistory = [];

  for (const { type, keysToRemove, extraData } of actions) {
    switch (type) {
      case 'addProperties':
        addProperties(newObj, extraData);
        stateHistory.push(Object.assign({}, newObj));
        break;

      case 'removeProperties':
        removeProperties(newObj, keysToRemove);
        stateHistory.push(Object.assign({}, newObj));
        break;

      case 'clear':
        clearProperties(newObj);
        stateHistory.push(Object.assign({}, newObj));
        break;
    }
  }

  return stateHistory;
}

function addProperties(newObj, extraData) {
  Object.assign(newObj, extraData);
}

function removeProperties(newObj, keysToRemove) {
  for (const key of keysToRemove) {
    delete newObj[key];
  }
}

function clearProperties(newObj) {
  for (const key in newObj) {
    delete newObj[key];
  }
}

module.exports = transformStateWithClones;
