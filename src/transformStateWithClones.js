'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const emptyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        emptyArray.push(Object.assign({}, stateCopy));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        emptyArray.push(Object.assign({}, stateCopy));
        break;

      case 'clear':
        for (const stateKey in stateCopy) {
          delete stateCopy[stateKey];
        }
        emptyArray.push(Object.assign({}, stateCopy));
        break;

      default:
        throw new Error('Whoops, something bad happened');
    }
  }

  return emptyArray;
}

module.exports = transformStateWithClones;
