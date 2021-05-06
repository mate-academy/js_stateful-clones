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
    switch (arElem.type) {
      case 'addProperties':
        for (const addVal in arElem.extraData) {
          newState[addVal] = arElem.extraData[addVal];
        };
        break;

      case 'removeProperties':
        const removeArray = arElem.keysToRemove;

        for (const removeElem of removeArray) {
          delete newState[removeElem];
        };
        break;

      case 'clear':
        for (const elemDel in newState) {
          delete newState[elemDel];
        };
        break;
    }
    resArray.push(Object.assign({}, newState));
  }

  return resArray;
}

module.exports = transformStateWithClones;
