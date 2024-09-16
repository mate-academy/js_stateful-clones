'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const transform of actions) {
    switch (transform.type) {
      case 'addProperties' :
        Object.assign(copyState, transform.extraData);
        break;
      case `removeProperties` :
        transform.keysToRemove.forEach(keyToRemove =>
          delete copyState[keyToRemove]);
        break;
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;

      default:
        throw new Error('unknown action type');
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
