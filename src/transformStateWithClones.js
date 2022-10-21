'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrStateActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }
        break;

      case 'clear':
        for (const keyRem in stateCopy) {
          delete stateCopy[keyRem];
        }
        break;

      default:
        throw new Error('actions is not correct');
    }
    arrStateActions.push({ ...stateCopy });
  }

  return arrStateActions;
}

module.exports = transformStateWithClones;
