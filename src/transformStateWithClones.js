'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const action of actions) {
    current = { ...current };

    switch (action.type) {
      case 'clear':
        current = {};
        break;
      case 'addProperties':
        Object.assign(current, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete current[key];
        }
        break;
    }

    result.push(current);
  }

  return result;
}

module.exports = transformStateWithClones;
