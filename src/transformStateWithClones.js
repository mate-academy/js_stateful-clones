'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...prevState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...prevState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...prevState };
    }
    result.push(nextState);
    prevState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
