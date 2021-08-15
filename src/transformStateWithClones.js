'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];

  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const keys in cloneState) {
          delete cloneState[keys];
        }
        break;

      case 'removeProperties':
        for (const act in action.keysToRemove) {
          delete cloneState[action.keysToRemove[act]];
        }
        break;

      case 'addProperties':
        Object.assign(cloneState, action.extraData);
    }
    res.push({ ...cloneState });
  }

  return res;
}

module.exports = transformStateWithClones;
