'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const lastData = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(lastData, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete lastData[remove];
        }
        break;

      case 'clear':
        for (const key in lastData) {
          delete lastData[key];
        }
        break;

      default:
        return null;
    }

    result.push(Object.assign({}, lastData));
  }

  return result;
}

module.exports = transformStateWithClones;
