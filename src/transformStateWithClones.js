'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_CLEAR = 'clear';
  const ACTION_ADD = 'addProperties';
  const ACTION_REMOVE = 'removeProperties';
  const stateClone = Object.assign({}, state);
  const states = [];

  for (const action of actions) {
    if (action.type === ACTION_CLEAR) {
      for (const key in stateClone) {
        delete stateClone[key];
      }
      states.push(Object.assign({}, stateClone));
    }

    if (action.type === ACTION_ADD) {
      Object.assign(stateClone, action.extraData);
      states.push(Object.assign({}, stateClone));
    }

    if (action.type === ACTION_REMOVE) {
      for (const property of action.keysToRemove) {
        delete stateClone[property];
      }
      states.push(Object.assign({}, stateClone));
    }
  }

  return states;
}

module.exports = transformStateWithClones;
