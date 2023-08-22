'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = Object.assign({}, state);

  for (const target of actions) {
    if (target.type === 'addProperties') {
      const current = Object.assign({}, currentState, target.extraData);

      result.push(current);
      currentState = current;
    } else if (target.type === 'removeProperties') {
      const current = Object.assign({}, currentState);

      for (const keyToRemove of target.keysToRemove) {
        delete current[keyToRemove];
      }

      result.push(current);
      currentState = current;
    } else if (target.type === 'clear') {
      const current = {};

      result.push(current);
      currentState = current;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
