'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';
  const result = [];
  let currentState = Object.assign({}, state);

  for (const target of actions) {
    const { type, extraData, keysToRemove } = target;
    let current;

    switch (type) {
      case add:
        current = Object.assign({}, currentState, extraData);
        result.push(current);
        currentState = current;
        break;

      case remove:
        current = Object.assign({}, currentState);

        for (const key of keysToRemove) {
          delete current[key];
        }

        result.push(current);
        currentState = current;
        break;

      case clear:
        current = {};
        result.push(current);
        currentState = current;
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
