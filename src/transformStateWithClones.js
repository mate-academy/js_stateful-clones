'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionTypes = {
    addAction: 'addProperties',
    removeAction: 'removeProperties',
    clearAction: 'clear',
  };

  const modifiedObj = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case actionTypes.addAction:
        Object.assign(modifiedObj, action.extraData);
        break;

      case actionTypes.removeAction:
        action.keysToRemove.forEach((key) => {
          delete modifiedObj[key];
        });
        break;

      case actionTypes.clearAction:
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
