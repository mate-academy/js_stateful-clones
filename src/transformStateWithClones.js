'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';

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

        for (const keyToRemove of keysToRemove) {
          delete current[keyToRemove];
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
