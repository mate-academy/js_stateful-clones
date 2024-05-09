'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const updateState = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(updateState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          if (key in updateState) {
            delete updateState[key];
          }
        }
        break;

      case 'clear':
        for (const key in updateState) {
          delete updateState[key];
        }
        break;
    }

    result.push({ ...updateState });
  }

  return result;
}

module.exports = transformStateWithClones;
