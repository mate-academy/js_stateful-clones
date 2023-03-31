'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listStates = [];
  const cloneState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        return 'Erorr';
    }
    listStates.push({ ...cloneState });
  }

  for (const key in cloneState) {
    delete cloneState[key];
  }

  return listStates;
}
module.exports = transformStateWithClones;
