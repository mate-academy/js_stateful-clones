'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const stateOnAction = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateOnAction, item.extraData);
        resultArr.push({ ...stateOnAction });
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete stateOnAction[key];
        }
        resultArr.push({ ...stateOnAction });
        break;

      case 'clear':
        for (const key in stateOnAction) {
          delete stateOnAction[key];
        }
        resultArr.push({ ...stateOnAction });
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
