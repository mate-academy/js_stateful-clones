'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const allStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      allStates.push(Object.assign({}, stateClone));
    }

    if (action.type === 'removeProperties') {
      for (const eachKey of action.keysToRemove) {
        delete stateClone[eachKey];
      }
      allStates.push(Object.assign({}, stateClone));
    }

    if (action.type === 'clear') {
      stateClone = {};
      allStates.push(Object.assign({}, stateClone));
    }
  }

  return allStates;
}

module.exports = transformStateWithClones;
