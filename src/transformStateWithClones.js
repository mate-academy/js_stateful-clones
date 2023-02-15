'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const array = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(cloneState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }
    array.push({ ...cloneState });
  }

  return array;
}

module.exports = transformStateWithClones;
