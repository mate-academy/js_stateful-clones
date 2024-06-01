'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const finalObject = [];
  let modObject = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(modObject, action.extraData);
      finalObject.push({ ...modObject });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete modObject[key]);
      finalObject.push({ ...modObject });
    }

    if (action.type === 'clear') {
      modObject = {};
      finalObject.push({ ...modObject });
    }
  }

  return finalObject;
}

module.exports = transformStateWithClones;
