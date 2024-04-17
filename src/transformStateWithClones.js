'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = { ...state };
  const actionsArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newObject, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete newObject[property];
      }
    }

    if (action.type === 'clear') {
      newObject = {};
    }
    actionsArray.push({ ...newObject });
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
