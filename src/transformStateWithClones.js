'use strict';

const { clearProps, removeProps, addProps } = require('./stransformOperations');

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const copyState = structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProps(copyState, action['extraData']);
        break;
      case 'removeProperties':
        removeProps(copyState, action['keysToRemove']);
        break;
      case 'clear':
        clearProps(copyState);
        break;
      default:
        states.push({});
        continue;
    }
    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
