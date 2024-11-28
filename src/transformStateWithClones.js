'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOWE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  const res = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(copyState, action.extraData);
        break;

      case REMOWE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case CLEAR:
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      default:
        return state;
    }
    res.push({ ...copyState });
  }

  return res;
}

module.exports = transformStateWithClones;
