'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const temporaryObject = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(temporaryObject, actions[i].extraData);
        stateArray.push({ ...temporaryObject });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete temporaryObject[key];
        }

        stateArray.push({ ...temporaryObject });

        break;

      case 'clear':
        for (const key in temporaryObject) {
          delete temporaryObject[key];
        }

        stateArray.push({ ...temporaryObject });

        break;

      default:
        throw new Error('Unknown what to do');
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
