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
    const { extraData } = action;

    switch (action.type) {
      case 'clear':
        cloneState = {};
        break;

      case 'addProperties':
        cloneState = {
          ...cloneState, ...extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete cloneState[key]);
        break;
      default:
    }

    resultArr.push({ ...cloneState });
  });

  return resultArr;
}

module.exports = transformStateWithClones;
