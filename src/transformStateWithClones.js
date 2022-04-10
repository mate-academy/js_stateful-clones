'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = { ...state };
  const resultArr = [];
  let keysToRemoveArr;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(result, action.extraData);

      const stateToSave = { ...result };

      resultArr.push(stateToSave);

      result = { ...stateToSave };
    }

    if (action.type === 'removeProperties') {
      keysToRemoveArr = action.keysToRemove;

      for (const elem of keysToRemoveArr) {
        for (const key in result) {
          if (key === elem) {
            delete result[key];
          }
        }
      }

      const stateToSave = { ...result };

      resultArr.push(stateToSave);

      result = { ...stateToSave };
    }

    if (action.type === 'clear') {
      const stateToSave = {};

      resultArr.push(stateToSave);

      result = { ...stateToSave };
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
