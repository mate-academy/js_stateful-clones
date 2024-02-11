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
    switch (action.type) {
      case 'clear':
        modifiedObject = {};
        finalHistoryArray.push({ ...modifiedObject });
        break;
      case 'addProperties':
        Object.assign(modifiedObject, action.extraData);
        finalHistoryArray.push({ ...modifiedObject });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete modifiedObject[key]);
        finalHistoryArray.push({ ...modifiedObject });
        break;
      default:
        finalHistoryArray.push({ ...modifiedObject });
    }
  });

  return finalHistoryArray;
}

module.exports = transformStateWithClones;
