'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_COPYS = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyRemove of action.keysToRemove) {
        if (stateCopy[keyRemove] !== undefined) {
          delete stateCopy[keyRemove];
        }
      }
    }

    if (action.type === 'clear') {
      stateCopy = {};
    }

    STATE_COPYS.push(stateCopy);
    currentState = stateCopy;
  }

  return STATE_COPYS;
}

module.exports = transformStateWithClones;
