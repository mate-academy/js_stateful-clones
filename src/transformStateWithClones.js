'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];

  const tempState = {};

  for (const { type, extraData, keysToRemove } of actions) {
    if (actionsArray.length === 0) {
      Object.assign(tempState, state);
    } else {
      clearProperties();
      Object.assign(tempState, actionsArray[actionsArray.length - 1]);
    }

    if (type === 'addProperties') {
      addProperties(extraData);
    }

    if (type === 'removeProperties') {
      removeProperties(keysToRemove);
    }

    if (type === 'clear') {
      clearProperties();
    }

    actionsArray.push({ ...tempState });
  }

  function addProperties(addProp) {
    for (const key in addProp) {
      tempState[key] = addProp[key];
    }
  }

  function removeProperties(removePorp) {
    for (const key of removePorp) {
      delete tempState[key];
    }
  }

  function clearProperties() {
    for (const key in tempState) {
      delete tempState[key];
    }
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
