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
      resultArray.push(Object.assign({}, copyState));
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
      resultArray.push(Object.assign({}, copyState));
    } else if (action.type === 'clear') {
      copyState = {};
      resultArray.push({});
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
