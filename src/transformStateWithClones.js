'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const cloneState = { ...state };

  for (const args of actions) {
    switch (args.type) {
      case 'addProperties':
        Object.assign(cloneState, args.extraData);
        array.push(Object.assign({}, cloneState));
        break;

      case 'removeProperties':
        for (const keyToRemove of args.keysToRemove) {
          if (cloneState.hasOwnProperty(keyToRemove)) {
            delete cloneState[keyToRemove];
          }
        }
        array.push(Object.assign({}, cloneState));
        break;

      default:
        for (const key in cloneState) {
          delete cloneState[key];
        }
        array.push(Object.assign({}, cloneState));
    }
  }

  return array;
}

module.exports = transformStateWithClones;
