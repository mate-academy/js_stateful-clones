'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrOfClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, { ...action.extraData });
        break;

      case 'removeProperties':
        const values = action.keysToRemove;

        values.map(el => delete stateCopy[el]);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    arrOfClones.push({ ...stateCopy });
  }

  return arrOfClones;
}
module.exports = transformStateWithClones;
