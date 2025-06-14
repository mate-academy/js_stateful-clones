'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let curState = structuredClone(state);
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(curState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete curState[key];
      }
    } else if (action.type === 'clear') {
      curState = {};
    }

    states.push(structuredClone(curState));
  }

  return states;
}

module.exports = transformStateWithClones;
