'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        newState = { ...newState, ...item.extraData };
        result.push(newState);
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of item.keysToRemove) {
          delete newState[key];
        }
        result.push(newState);
        break;

      case 'clear':
        newState = {};
        result.push(newState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
