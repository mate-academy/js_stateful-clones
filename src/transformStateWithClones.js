'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStatement = [];

  const coppiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(coppiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete coppiedState[key];
        }
        break;

      case 'clear':
        for (const key in coppiedState) {
          delete coppiedState[key];
        }
        break;
    }
    allStatement.push(Object.assign({}, coppiedState));
  }

  return allStatement;
}

module.exports = transformStateWithClones;
