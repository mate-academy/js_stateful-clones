'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  function addProperties(obj, extraData) {
    const newState = Object.assign({}, obj, extraData);

    return newState;
  }

  function removeProperties(obj, keysToRemove) {
    const newState = { ...obj };

    for (const key of keysToRemove) {
      delete newState[key];
    }

    return newState;
  }

  function clear(obj) {
    return {};
  }

  const resultArray = [];
  let resultState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      resultState = addProperties(resultState, action.extraData);
      resultArray.push({ ...resultState });
    } else if (action.type === 'removeProperties') {
      resultState = removeProperties(resultState, action.keysToRemove);
      resultArray.push({ ...resultState });
    } else if (action.type === 'clear') {
      resultState = clear(resultState);
      resultArray.push({ ...resultState });
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
