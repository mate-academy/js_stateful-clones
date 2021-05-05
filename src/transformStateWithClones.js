'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const resArray = [];

  for (const arElem of actions) {
    if (arElem.type === 'addProperties') {
      for (const addVal in arElem.extraData) {
        newState[addVal] = arElem.extraData[addVal];
      }
    }

    if (arElem.type === 'removeProperties') {
      const removeArray = arElem.keysToRemove;

      for (const removeElem of removeArray) {
        delete newState[removeElem];
      }
    }

    if (arElem.type === 'clear') {
      for (const elemDel in newState) {
        delete newState[elemDel];
      }
    }
    resArray.push(Object.assign({}, newState));
  }

  return resArray;
}

module.exports = transformStateWithClones;
