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
    const ACTION_TYPE = action.type;

    switch (ACTION_TYPE) {
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

    RESULT_ARR.push({ ...STATE_CLONE });
  }

  return RESULT_ARR;

  function addProperties(changingObject, extraData) {
    Object.assign(changingObject, extraData);
  }

  function removeProperties(changingObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete changingObject[key];
    }
  }

  function clearProperties(changingObject) {
    for (const key in changingObject) {
      delete changingObject[key];
    }
  }
}

module.exports = transformStateWithClones;
