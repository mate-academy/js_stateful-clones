'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyState = { ...state };

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      copyState = {
        ...copyState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => {
        if (copyState.hasOwnProperty(key)) {
          delete copyState[key];
        }
      });
    } else if (action.type === 'clear') {
      copyState = {};
    }
    resultArr.push({ ...copyState });
  });

  return resultArr;
}

module.exports = transformStateWithClones;
