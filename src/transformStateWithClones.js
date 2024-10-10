'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const res = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(stateCopy, i.extraData);
        break;

      case 'removeProperties':
        for (const j of i.keysToRemove) {
          delete stateCopy[j];
        }

        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      default:
        throw new Error(`Unknown action type: ${i.type}`);
    }

    res.push({ ...stateCopy });
  }

  return res;
}

module.exports = transformStateWithClones;
