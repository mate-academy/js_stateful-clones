'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];

  for (const action of actions) {
    let stateCopy = { ...state };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateCopy[prop];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }
    newArr.push(stateCopy);
  }

  return newArr;
}

module.exports = transformStateWithClones;
