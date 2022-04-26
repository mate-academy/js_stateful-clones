'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneObj = { ...state };
  const result = [];

  for (const action of actions) {
    let objCopy = Object.assign({}, cloneObj);

    switch (action.type) {
      case 'addProperties':
        Object.assign(objCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objCopy[key];
        }
        break;

      case 'clear':
        objCopy = {};
    }

    cloneObj = objCopy;
    result.push(objCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
