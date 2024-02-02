'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let cloneState = { ...state };

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      cloneState = {
        ...cloneState, ...action.extraData,
      };
    }

    if (action.type === 'clear') {
      cloneState = {};
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete cloneState[key]);
    }

    resultArr.push({ ...cloneState });
  });

  return resultArr;
}

module.exports = transformStateWithClones;
