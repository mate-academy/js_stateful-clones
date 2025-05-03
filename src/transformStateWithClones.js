'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let current = { ...state };
   for (let action of actions) {
    if (action.type === 'clear') {
      current = {};
    }
    if (action.type === 'addProperties') {
      current = { ...current, ...action.extraData };
    }
    if (action.type === 'removeProperties') {
      current = { ...current };
      for (let key of action.keysToRemove) {
        delete current[key];
      }
    }
    history.push(current);
  }
  return history;
}
module.exports = transformStateWithClones;
