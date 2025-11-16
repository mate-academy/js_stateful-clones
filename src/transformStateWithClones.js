'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break

      // eslint-disable-next-line no-fallthrough
      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete nextState[item];
        }
        break;

      default:
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
