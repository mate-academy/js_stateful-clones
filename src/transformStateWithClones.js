'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allChanges = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(element => {
          delete stateCopy[element];
        });
        break;

      case 'clear' :
        for (const properties in stateCopy) {
          delete stateCopy[properties];
        }
        break;

      default:
        throw Error('Wrong properties. Please contact with support');
    }

    allChanges.push({ ...stateCopy });
  }

  return allChanges;
}

module.exports = transformStateWithClones;
