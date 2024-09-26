'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = {};
  const result = [];

  Object.assign(stateCopy, state);

  for (const action of actions) {
    stateCopy = Object.assign({}, stateCopy);

    if (action.type === 'clear') {
      for (const property in stateCopy) {
        delete stateCopy[property];
      }
      result.push(stateCopy);
    }

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      result.push(stateCopy);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete stateCopy[property];
      }
      result.push(stateCopy);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
