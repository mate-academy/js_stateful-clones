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
    if (args.type === 'addProperties') {
      Object.assign(cloneState, args.extraData);
      array.push(Object.assign({}, cloneState));
    } else if (args.type === 'removeProperties') {
      for (const keyToRemove of args.keysToRemove) {
        if (cloneState.hasOwnProperty(keyToRemove)) {
          delete cloneState[keyToRemove];
        }
      }
      array.push(Object.assign({}, cloneState));
    } else if (args.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
      array.push(Object.assign({}, cloneState));
    }
  }

  return array;
}

module.exports = transformStateWithClones;
