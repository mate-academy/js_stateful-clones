'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const temporary = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(temporary, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporary[key];
        }

        break;

      case 'clear':
        for (const key in temporary) {
          delete temporary[key];
        }
    }

    result.push(Object.assign({}, temporary));
  }

  return result;
}

module.exports = transformStateWithClones;
