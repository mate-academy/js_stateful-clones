'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateTransformed = [];

  let actualState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        actualState = { ...actualState, ...action.extraData };
        break;
      case 'clear':
        actualState = {};
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete actualState[key];
        }
        break;
    }
    stateTransformed.push({ ...actualState });
  }

  return stateTransformed;
}

module.exports = transformStateWithClones;
