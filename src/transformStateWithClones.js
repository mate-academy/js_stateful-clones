'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const initialObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(initialObject, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete initialObject[value];
        }
        break;

      case 'clear':
        for (const key in initialObject) {
          delete initialObject[key];
        }
        break;

      default:
        break;
    }

    result.push({ ...initialObject });
  }

  return result;
}

module.exports = transformStateWithClones;
