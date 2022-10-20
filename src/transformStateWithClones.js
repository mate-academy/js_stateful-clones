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

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);

        break;

      case 'removeProperties':
        for (const remove of obj.keysToRemove) {
          delete stateCopy[remove];
        }
        break;

      case 'clear':
        for (const keyRem in stateCopy) {
          delete stateCopy[keyRem];
        }
        break;

      default:
        return 'ERROR';
    }
    arrStateActions.push({ ...stateCopy });
  }

  return arrStateActions;
}

module.exports = transformStateWithClones;
