'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const objectData = [];

  actions.forEach(element => {
    switch (element.type) {
      case 'addProperties':
        Object.assign(stateCopy, element.extraData);
        break;

      case 'removeProperties':
        element.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;

      default:
        throw new Error('data dont regard conditions');
    }

    objectData.push({ ...stateCopy });
  });

  return objectData;
}

module.exports = transformStateWithClones;
