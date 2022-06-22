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
        result.push(Object.assign({}, temporary));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporary[key];
        }

        result.push(Object.assign({}, temporary));
        break;

      case 'clear':
        for (const key in temporary) {
          delete temporary[key];
        }

        result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
