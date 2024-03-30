'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfStateObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const statesToRemove of action.keysToRemove) {
          delete copyOfStateObject[statesToRemove];
        }
        break;
      case 'addProperties':
        Object.assign(copyOfStateObject, action.extraData);
        break;
      case 'clear':
        for (const keyElement in copyOfStateObject) {
          delete copyOfStateObject[keyElement];
        }
        break;
      default:
        return `some error occurred`;
    }
    result.push({ ...copyOfStateObject });
  }

  return result;
}

module.exports = transformStateWithClones;
