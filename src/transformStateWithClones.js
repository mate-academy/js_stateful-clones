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

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        for (const piece in act.extraData) {
          newState[piece] = act.extraData[piece];
        }
        break;
      case 'removeProperties':
        for (const piece of act.keysToRemove) {
          delete newState[piece];
        }
        break;
      case 'clear':
        for (const some in newState) {
          delete newState[some];
        }
        break;
    }
    result.push(newState);
    newState = Object.assign({}, newState);
  }

  return result;
}

module.exports = transformStateWithClones;
