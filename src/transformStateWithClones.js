'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];
  const cloneObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneObject, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete cloneObject[remove];
        }
        break;

      case 'clear':
        for (const clear in cloneObject) {
          delete cloneObject[clear];
        }
        break;

      default:
        break;
    }
    cloneState.push({ ...cloneObject });
  }

  return cloneState;
}

module.exports = transformStateWithClones;
