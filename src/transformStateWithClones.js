'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateCopy[keyRemove];
        }
        break;

      case 'clear':
        for (const keyClear in stateCopy) {
          delete stateCopy[keyClear];
        }
        break;
    }
    newState.push(stateCopy);
    stateCopy = Object.assign({}, stateCopy);
  }

  return newState;
}

module.exports = transformStateWithClones;
