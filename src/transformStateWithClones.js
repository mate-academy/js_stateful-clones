'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const phantomState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(phantomState, action.extraData);
    }

    if (action.type === 'clear') {
      for (const key in phantomState) {
        delete phantomState[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const keyForState of action.keysToRemove) {
        if (phantomState[keyForState]) {
          delete phantomState[keyForState];
        }
      }
    }

    resultArr.push({ ...phantomState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
