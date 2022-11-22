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

  actions.forEach(item => {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        break;

      case 'removeProperties':
        item.keysToRemove.forEach(keyDel => {
          delete stateCopy[keyDel];
        });
        break;

      case 'clear':
        for (const keyFoClear in stateCopy) {
          delete stateCopy[keyFoClear];
        }
        break;
    }
    result.push({ ...stateCopy });
  });

  return result;
}

module.exports = transformStateWithClones;
