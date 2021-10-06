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
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const word of action.keysToRemove) {
          delete newState[word];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        break;
    }
    result.push({...newState});
  }

  return result;
}

module.exports = transformStateWithClones;
