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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(objCopy, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of actions[i].keysToRemove) {
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
