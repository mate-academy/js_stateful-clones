'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newState, obj.extraData);
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
