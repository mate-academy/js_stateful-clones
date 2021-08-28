'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const res = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }
    res.push({ ...cloneState });
  }

  return res;
}

module.exports = transformStateWithClones;
