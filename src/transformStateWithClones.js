'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateCopy = Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'clear') {
      stateCopy = {};
    }

    const toAdd = Object.assign({}, stateCopy);

    result.push(toAdd);
  }

  return result;
}

module.exports = transformStateWithClones;
