'use strict';

/**
 * @param {Object} copyState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const res = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of obj.keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }

    res.push(Object.assign({}, copyState));
  }

  return res;
}

module.exports = transformStateWithClones;
