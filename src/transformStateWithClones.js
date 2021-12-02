'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let changeState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(changeState, key.extraData);
        break;
      case 'removeProperties':
        for (const removeKey of key.keysToRemove) {
          delete changeState[removeKey];
        }
        break;
      case 'clear':
        changeState = {};
        break;
    }
    newState.push({ ...changeState });
  }

  return newState;
}

module.exports = transformStateWithClones;
