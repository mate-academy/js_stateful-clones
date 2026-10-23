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
    let next = { ...prevState };
    switch (action.type) {
      case 'clear':
        next = {};
        break;
      case 'addProperties':
        next = { ...next, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      default:
        break;
    }
    result.push(next);
    prevState = next;
  }
  return result;
}
module.exports = transformStateWithClones;
