'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const add = 'addProperties';
    const remove = 'removeProperties';
    const clear = 'clear';

    switch (type) {
      case add:

        Object.assign(newState, extraData);

        break;

      case remove:

        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;

      case clear:
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    result.push({ ...newState });
  }

  return result;
}
}

module.exports = transformStateWithClones;
