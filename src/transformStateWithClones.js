'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = Object.assign({}, state);
  const copyStateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(copyState).forEach(key => {
          delete copyState[key];
        });
        break;

      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(element => {
          delete copyState[element];
        });
        break;

      default:
        throw new Error('error description');
    }

    copyStateArray.push({ ...copyState });
  }

  return copyStateArray;
}

module.exports = transformStateWithClones;
