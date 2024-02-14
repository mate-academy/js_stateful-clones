'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  const result = [];

  for (const action of actions) {
    if (action.type === ADD_PROPERTIES) {
      Object.assign(cloneState, action.extraData);
      result.push({ ...cloneState });
    } else if (action.type === REMOVE_PROPERTIES) {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
      result.push({ ...cloneState });
    } else if (action.type === CLEAR) {
      for (const key in cloneState) {
        delete cloneState[key];
      }
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
