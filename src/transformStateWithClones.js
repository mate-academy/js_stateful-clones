'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const temp = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(temp, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temp[key];
        }

        break;

      case 'clear':
        for (const key in temp) {
          delete temp[key];
        }
    }

    result.push(Object.assign({}, temp));
  }

  return result;
}

module.exports = transformStateWithClones;
