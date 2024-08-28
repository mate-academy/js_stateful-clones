'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const removeElement of action.keysToRemove) {
          delete stateCopy[removeElement];
        }
        break;
      case 'clear':
        for (const stateCopyKey in stateCopy) {
          delete stateCopy[stateCopyKey];
        }
        break;
      default:
        throw Error('Action is not defined!');
    }
    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
