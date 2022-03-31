'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrContainer = [];

  const tempObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (tempObj.hasOwnProperty(key)) {
            delete tempObj[key];
          }
        }
        break;

      default:
        for (const stateKey in tempObj) {
          delete tempObj[stateKey];
        }
        break;
    }

    arrContainer.push({ ...tempObj });
  }

  return arrContainer;
}

module.exports = transformStateWithClones;
