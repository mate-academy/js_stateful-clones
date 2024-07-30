'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return x
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  let states = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      cloneState = {};
    } else if (action.type === 'addProperties') {
      cloneState = { ...cloneState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
        for (const key of action.keysToRemove) {
          delete cloneState[key];
      }
    }
    states.push({...cloneState});
  }

  return states;
}

module.exports = transformStateWithClones;
