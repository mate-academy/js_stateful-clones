'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CopyOfStateObject = { ...state };
  const result = [];

  for (const action of actions) {
    const currentObjectState = { ...CopyOfStateObject };

    switch (action.type) {
      case 'removeProperties':
        for (const statesToRemove of action.keysToRemove) {
          delete CopyOfStateObject[statesToRemove];
          delete currentObjectState[statesToRemove];
        }
        result.push(currentObjectState);
        break;
      case 'addProperties':
        Object.assign(currentObjectState, action.extraData);
        Object.assign(CopyOfStateObject, action.extraData);
        result.push(currentObjectState);
        break;
      case 'clear':
        for (const keyElement in CopyOfStateObject) {
          delete CopyOfStateObject[keyElement];
          delete currentObjectState[keyElement];
        }
        result.push({});
        break;
      default:
        return `some error occurred`;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
