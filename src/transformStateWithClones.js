'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  const stateClone = Object.assign({}, state);

  function iterate(arr) {
    for (const key of arr) {
      delete stateClone[key];
    }
  }

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      history.push({ ...stateClone });
    } else if (action.type === 'removeProperties') {
      iterate(action.keysToRemove);
      history.push({ ...stateClone });
    } else if (action.type === 'clear') {
      const keys = Object.keys(stateClone);

      iterate(keys);
      history.push({ ...stateClone });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
