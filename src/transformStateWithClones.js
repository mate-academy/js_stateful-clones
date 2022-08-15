'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(stateCopy, i.extraData);
        break;

      case 'removeProperties':
        for (const j of i.keysToRemove) {
          for (const key in stateCopy) {
            if (key === j) {
              delete stateCopy[key];
            }
          }
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
    }

    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

module.exports = transformStateWithClones;
