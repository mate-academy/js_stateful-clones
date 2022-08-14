'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const resArr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        resArr.push({ ...clone });
        break;

      case 'removeProperties':
        const toRemove = obj.keysToRemove;

        for (const rem of toRemove) {
          delete clone[rem];
        }
        resArr.push({ ...clone });
        break;

      case 'clear':
        for (const clear in clone) {
          delete clone[clear];
        }
        resArr.push({ ...clone });
        break;

      default:
        throw new Error('Error: obj.type is not defined');
    }
  }

  return resArr;
}

module.exports = transformStateWithClones;
