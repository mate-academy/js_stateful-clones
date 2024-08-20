'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let tempState = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        tempState = { ...tempState, ...action.extraData };
        break;
      case 'removeProperties':
        tempState = { ...tempState };
        action.keysToRemove.forEach((key) => delete tempState[key]);
        break;
      case 'clear':
        Object.keys(tempState).forEach((key) => delete tempState[key]);
        break;
    }
    result.push({ ...tempState });
  });

  return result;
}

module.exports = transformStateWithClones;
