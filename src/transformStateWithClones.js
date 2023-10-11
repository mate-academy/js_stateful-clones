'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  let currentStateCopy = {};
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of actions[i].keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      case 'clear':
        for (const use in stateCopy) {
          delete stateCopy[use];
        }
        break;
      default:
    }
    currentStateCopy = { ...stateCopy };
    result.push(currentStateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
