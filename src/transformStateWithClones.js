'use strict';

const ACTION_TYPES = {
  add: 'addProperties',
  remove: 'removeProperties',
  clear: 'clear',
};

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove = [] } = action;

    switch (type) {
      case ACTION_TYPES.add:
        currentState = {
          ...currentState,
          ...extraData,
        };
        break;

      case ACTION_TYPES.remove:
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case ACTION_TYPES.clear:
        currentState = {};
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
