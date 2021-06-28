'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const values of action.keysToRemove) {
          delete newObj[values];
        }
        break;

      case 'clear':
        newObj = {};
        break;
    }
    newState.push({ ...newObj });
  }

  return newState;
}

module.exports = transformStateWithClones;
