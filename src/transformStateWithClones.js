'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;
      case 'clear':
        stateCopy = {};
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
