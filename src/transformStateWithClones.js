'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [Object.assign({}, state)];
  let cloneObject = result[0];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneObject = Object.assign({}, cloneObject, action.extraData);
        break;

      case 'removeProperties':
        cloneObject = Object.assign({}, cloneObject);

        for (const key of action.keysToRemove) {
          delete cloneObject[key];
        }
        break;

      case 'clear':
        cloneObject = {};
        break;

      default:
        break;
    }
    result.push(cloneObject);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
