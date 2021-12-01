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
    if (key.type === 'addProperties') {
      Object.assign(changeState, key.extraData);
      newState.push({ ...changeState });
    } else if (key.type === 'removeProperties') {
      for (const removeKey of key.keysToRemove) {
        delete changeState[removeKey];
      }
      newState.push({ ...changeState });
    } else if (key.type === 'clear') {
      changeState = {};
      newState.push({ ...changeState });
    }
  }

  return newState;
}

module.exports = transformStateWithClones;
