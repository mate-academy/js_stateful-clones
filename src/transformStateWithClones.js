'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;

      default:
        throw new Error('Check your input');
    }

    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

module.exports = transformStateWithClones;
