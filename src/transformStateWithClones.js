'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArr = [];
  const copyState = structuredClone(state);

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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      case 'clear':
        clear(copyState);
        break;

      default:
        return `${action.type} is incorrect and does not meet the requirements`;
    }

    resultArr.push(structuredClone(copyState));
  }

  return resultArr;
}

module.exports = transformStateWithClones;
