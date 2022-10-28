'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let transformedState = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(transformedState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete transformedState[key];
        }
        break;

      case 'clear':
        transformedState = {};
        break;

      default:
    }

    result.push({ ...transformedState });
  }

  return result;
}

module.exports = transformStateWithClones;
