'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_CLONE = Object.assign({}, state);
  const RESULT_ARR = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(STATE_CLONE, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(STATE_CLONE, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(STATE_CLONE);
        break;
    }
  }

  function addProperties(changingObject, extraData) {
    Object.assign(changingObject, extraData);
    result(RESULT_ARR, changingObject);
  }

  function removeProperties(changingObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete changingObject[key];
    }

    result(RESULT_ARR, changingObject);
  }

  function clearProperties(changingObject) {
    for (const key in changingObject) {
      delete changingObject[key];
    }

    result(RESULT_ARR, changingObject);
  }

  function result(arr, element) {
    arr.push(Object.assign({}, element));
  }

  return RESULT_ARR;
}

module.exports = transformStateWithClones;
