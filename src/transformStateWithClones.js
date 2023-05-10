'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedObj = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedObj, action['extraData']);
        break;

      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete clonedObj[key];
        }
        break;

      case 'clear':
        for (const key in clonedObj) {
          delete clonedObj[key];
        }
        break;

      default: throw new Error(`This statement: ${action.type} is unknown`);
    }

    result.push({ ...clonedObj });
  }

  return result;
}

module.exports = transformStateWithClones;
