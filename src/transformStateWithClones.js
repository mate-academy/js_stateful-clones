'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultCopy = [];
  let stateCopy = { ...state };

  for (const toDo of actions) {
    switch (toDo.type) {
      case 'addProperties':
        Object.assign(stateCopy, toDo.extraData);
        break;
      case 'removeProperties':
        for (const item of toDo.keysToRemove) {
          delete stateCopy[item];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }
    resultCopy.push({ ...stateCopy });
  }

  return resultCopy;
}

module.exports = transformStateWithClones;
