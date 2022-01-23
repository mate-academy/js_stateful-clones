'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const piece in action.extraData) {
          newState[piece] = action.extraData[piece];
        }
        break;
      case 'removeProperties':
        for (const piece of action.keysToRemove) {
          delete newState[piece];
        }
        break;
      case 'clear':
        for (const some in newState) {
          delete newState[some];
        }
        break;
      default:
        break;
    }
    result.push(newState);
    newState = Object.assign({}, newState);
  }

  return result;
}

module.exports = transformStateWithClones;
