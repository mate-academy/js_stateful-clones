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

  for (const action of actions) {
    for (const key in action) {
      switch (action[key]) {
        case 'addProperties':
          Object.assign(stateCopy, action.extraData);
          break;
        case 'removeProperties':
          for (const keyToRemove of action.keysToRemove) {
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
    }
    currentStateCopy = { ...stateCopy };
    result.push(currentStateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
