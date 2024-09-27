'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateObject, action.extraData);
        break;

      case 'removeProperties':
        for (const removeItem of action.keysToRemove) {
          delete stateObject[removeItem];
        }
        break;

      case 'clear':
        for (const remove in stateObject) {
          delete stateObject[remove];
        }
        break;

      default:
        break;
    }

    result.push({ ...stateObject });
  }

  return result;
}

module.exports = transformStateWithClones;
