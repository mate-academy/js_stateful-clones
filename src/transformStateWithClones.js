'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const stateEdited = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateEdited, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        if (stateEdited[property]) {
          delete stateEdited[property];
        }
      }
    }

    if (action.type === 'clear') {
      Object.keys(stateEdited).forEach(key => delete stateEdited[key]);
    }

    result.push({ ...stateEdited });
  }

  return result;
}

module.exports = transformStateWithClones;
