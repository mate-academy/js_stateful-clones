'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrContainer = [];

  let pushObject = { ...state };

  for (const action of actions) {
    const tempObj = { ...pushObject };

    if (action.type === 'addProperties') {
      Object.assign(tempObj, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (tempObj.hasOwnProperty(key)) {
          delete tempObj[key];
        }
      }
    } else if (action.type === 'clear') {
      for (const stateKey in tempObj) {
        delete tempObj[stateKey];
      }
    }

    pushObject = tempObj;
    arrContainer.push(pushObject);
  }

  return arrContainer;
}

module.exports = transformStateWithClones;
