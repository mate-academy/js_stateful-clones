'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = Object.assign({}, state);
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        resultArr.push(Object.assign({}, cloneState));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        resultArr.push(Object.assign({}, cloneState));
        break;

      case 'clear':
        for (const prop in cloneState) {
          delete cloneState[prop];
        }

        const emptyObj = {};

        resultArr.push(emptyObj);
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
