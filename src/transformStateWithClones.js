'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedResult = { ...state};
  Object.assign(modifiedResult, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProps(modifiedResult, action.extraData);
        break;

      case 'removeProperties':
        removeProps(modifiedResult, action.keysToRemove);
        break;

      case 'clear':
        clear(modifiedResult);
        break;

      default:
        return;
    }
  }

    function addProps(addResult, extraeData) {
      Object.assign(addResult, extraeData);
  }

  function removeProps(result, keysinToRemove) {
    for (const key of keysinToRemove) {
      delete result[key];
    }
  }

  function clear(plussResult) {
    for (const i in plussResult) {
      delete plussResult[i];
    }
  }

  return modifiedResult;

}

module.exports = transformStateWithClones;
