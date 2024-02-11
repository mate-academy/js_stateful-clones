'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalHistoryArray = [];
  let modifiedObject = { ...state };

  actions.forEach((action) => {
    if (action.type === 'clear') {
      modifiedObject = {};

      finalHistoryArray.push({ ...modifiedObject });
    } else if (action.type === 'addProperties') {
      Object.assign(modifiedObject, action.extraData);
      finalHistoryArray.push({ ...modifiedObject });
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete modifiedObject[key]);
      finalHistoryArray.push({ ...modifiedObject });
    }
  });

  return finalHistoryArray;
}

module.exports = transformStateWithClones;
