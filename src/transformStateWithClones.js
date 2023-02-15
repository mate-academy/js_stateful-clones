'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objCopy = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(objCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete objCopy[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in objCopy) {
        delete objCopy[key];
      }
    }

    history.push({ ...objCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
