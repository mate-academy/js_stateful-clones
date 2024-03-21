'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateModify = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateModify, action.extraData);
        states.push({ ...stateModify });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateModify[keyToRemove];
        }
        states.push({ ...stateModify });
        break;

      case 'clear':
        for (const key in stateModify) {
          delete stateModify[key];
        }
        states.push({ ...stateModify });
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
