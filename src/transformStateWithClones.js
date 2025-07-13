'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let stateCopy = { ...currentState };

    if (action.type === 'clear') {
      stateCopy = {};
      Object.assign(stateCopy, action.extraData);
    } else if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (let k = 0; k < action.keysToRemove.length; k++) {
        delete stateCopy[action.keysToRemove[k]];
      }
    }

    results.push(stateCopy);
    currentState = { ...stateCopy };
  }

  return results;
}

module.exports = transformStateWithClones;
