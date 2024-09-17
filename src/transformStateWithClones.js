'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clonedState = { ...state };
  const ADD_PROPS = 'addProperties';
  const REMOVE_PROPS = 'removeProperties';
  const CLEAR = 'clear';
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPS:
        Object.assign(clonedState, action.extraData);
        res.push({ ...clonedState });
        break;
      case REMOVE_PROPS:

        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        res.push({ ...clonedState });
        break;
      case CLEAR:

        for (const key in clonedState) {
          delete clonedState[key];
        }
        res.push({});
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
