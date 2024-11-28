'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let nowState = { ...state };
  const oldState = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        nowState = { ...nowState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (nowState.hasOwnProperty(key)) {
            delete nowState[key];
          }
        });
        break;
      case 'clear':
        nowState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    oldState.push({ ...nowState });
  });

  return oldState;
}

module.exports = transformStateWithClones;
