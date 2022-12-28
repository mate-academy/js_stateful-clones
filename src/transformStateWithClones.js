'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
      case 'removeProperties':
        for (const removekey of action.keysToRemove) {
          delete stateCopy[removekey];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      default:
        throw Error('error');
    }
    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

module.exports = transformStateWithClones;
