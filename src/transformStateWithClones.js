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
    switch (action.type) {
      case 'addProperties' :
        Object.assign(phantomState, action.extraData);
        break;

      case 'clear' :
        for (const key in phantomState) {
          delete phantomState[key];
        }
        break;

      case 'removeProperties' :
        for (const keyForState of action.keysToRemove) {
          if (phantomState[keyForState]) {
            delete phantomState[keyForState];
          }
        }
        break;
    }
    resultArr.push({ ...phantomState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
