'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        newArr.push({
          ...stateClone,
          ...action.extraData,
        });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateClone[key]);
        newArr.push({ ...stateClone });
        break;

      case 'clear':
        stateClone = {};
        newArr.push({});
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
