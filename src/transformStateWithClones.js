'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const cloneState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const toAdd = action.extraData;

      Object.assign(cloneState, toAdd);
      array.push(Object.assign({}, cloneState));
    }

    if (action.type === 'removeProperties') {
      const toRemove = action.keysToRemove;

      for (const key of toRemove) {
        delete cloneState[key];
      }
      array.push(Object.assign({}, cloneState));
    }

    if (action.type === 'clear') {
      for (const key in state) {
        delete cloneState[key];
      }
      array.push(Object.assign({}, cloneState));
    }
  }

  return array;
}

module.exports = transformStateWithClones;
