'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const char = [];
  const action = {
    ...state,
  };

  for (const value of actions) {
    if (value.type === 'addProperties') {
      for (const elem in value.extraData) {
        action[elem] = value.extraData[elem];
      }
    };

    if (value.type === 'removeProperties') {
      for (const key of value.keysToRemove) {
        if (action[key] !== undefined) {
          delete action[key];
        }
      }
    };

    if (value.type === 'clear') {
      for (const key in action) {
        delete action[key];
      }
    }

    const val = {
      ...action,
    };

    char.push(val);
  }

  return char;
}

module.exports = transformStateWithClones;
