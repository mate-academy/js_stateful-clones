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

  function pushActionToArr() {
    resultArr.push({ ...stateOnAction });
  }

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateOnAction, item.extraData);
        pushActionToArr();
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete stateOnAction[key];
        }
        pushActionToArr();
        break;

      case 'clear':
        for (const key in stateOnAction) {
          delete stateOnAction[key];
        }
        pushActionToArr();
        break;

      default:
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
