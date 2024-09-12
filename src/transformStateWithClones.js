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
  let currentState = { ...state };

  for (const target of actions) {
    const { type, extraData, keysToRemove } = target;

    switch (type) {
      case add:
        currentState = { ...currentState, ...extraData };
        break;

      case remove:
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case clear:
        currentState = {};
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}


module.exports = transformStateWithClones;
