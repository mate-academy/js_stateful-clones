'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];

  let newObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      newObj = { ...newObj, ...actions[i].extraData };
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        const deleteKey = actions[i].keysToRemove[j];

        delete newObj[deleteKey];
      }
    }

    if (actions[i].type === 'clear') {
      newObj = {};
    }
    newArr.push({ ...newObj });
  }

  return newArr;
}
module.exports = transformStateWithClones;
