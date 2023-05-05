'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [Object.assign({}, state)];

  for (const action of actions) {
    let newState = Object.assign({}, result[result.length - 1]);

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }
    result.push(newState);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
