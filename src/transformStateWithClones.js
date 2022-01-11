'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const newArr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newObj, actions[i].extraData);
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newObj[key];
        }
        break;
      case 'clear':
        newObj = {};
        break;
    }
    newArr.push(Object.assign({}, newObj));
  }

  return newArr;
}

module.exports = transformStateWithClones;
