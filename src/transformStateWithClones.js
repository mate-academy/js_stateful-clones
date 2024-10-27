'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const temporaryObj = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      addProperties(extraData);
    }

    if (type === 'removeProperties') {
      removeProperties(keysToRemove);
    }

    if (type === 'clear') {
      clearProperties();
    }

    stateHistory.push({ ...temporaryObj });
  }

  function addProperties(addInfo) {
    Object.assign(temporaryObj, addInfo);
  }

  function removeProperties(delInfo) {
    for (const key of delInfo) {
      delete temporaryObj[key];
    }
  }

  function clearProperties() {
    for (const key in temporaryObj) {
      delete temporaryObj[key];
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
