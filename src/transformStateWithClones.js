'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({ ...state });
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        result.push(Object.assign({}, stateCopy));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
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
