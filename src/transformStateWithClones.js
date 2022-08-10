'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfChandes = [];
  const newObj = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties' :
        Object.assign(newObj, obj.extraData);
        arrOfChandes.push({ ...newObj });
        break;

      case 'removeProperties':
        for (const j of obj.keysToRemove) {
          delete newObj[j];
        }
        arrOfChandes.push({ ...newObj });
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        arrOfChandes.push({ ...newObj });
        break;

      default:
        break;
    }
  }

  return arrOfChandes;
}

module.exports = transformStateWithClones;
