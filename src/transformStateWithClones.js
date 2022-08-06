'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objCopy = Object.assign({}, state);
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete objCopy[keyRemove];
        }
        break;

      case 'clear':
        for (const keyClear in objCopy) {
          delete objCopy[keyClear];
        }
        break;
    }
    newState.push(objCopy);
    objCopy = Object.assign({}, objCopy);
  }

  return newState;
}

module.exports = transformStateWithClones;
