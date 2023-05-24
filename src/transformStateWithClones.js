'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addAction = 'addProperties';
  const removeAction = 'removeProperties';
  const clearAction = 'clear';

  const modifiedObj = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case addAction:
        Object.assign(modifiedObj, action.extraData);
        break;

      case removeAction:
        action.keysToRemove.forEach((key) => {
          delete modifiedObj[key];
        });
        break;

      case clearAction:
        for (const key in modifiedObj) {
          if (modifiedObj.hasOwnProperty(key)) {
            delete modifiedObj[key];
          }
        }
        break;

      default:
        break;
    }

    result.push({ ...modifiedObj });
  });

  return result;
}

module.exports = transformStateWithClones;
