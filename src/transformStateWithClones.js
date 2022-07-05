'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    } else if (action.type === 'clear') {
      copyState = {};
    }

    const resultState = { ...copyState };

    resultArray.push(resultState);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
