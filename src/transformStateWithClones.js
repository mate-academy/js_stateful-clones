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

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(stateCopy, i.extraData);
        result.push(Object.assign({}, stateCopy));
        break;

      case 'removeProperties':
        for (const key of i.keysToRemove) {
          delete stateCopy[key];
        }
        result.push(Object.assign({}, stateCopy));
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        result.push(Object.assign({}, stateCopy));
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
