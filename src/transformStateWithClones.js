'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  let rollingState = { ...state };

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(rollingState, action['extraData']);
        break;

      case 'removeProperties':
        for (const prop of action['keysToRemove']) {
          delete rollingState[prop];
        };
        break;

      default:
        rollingState = {};
        break;
    }
    states.push({ ...rollingState });
  }

  return states;
}

module.exports = transformStateWithClones;
