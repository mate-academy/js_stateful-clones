'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let stateCopy = Object.assign({}, state);
  for (let { type, extraData, keysToRemove } of actions) {

    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (let l = 0; l < keysToRemove.length; l++) {
          delete stateCopy[keysToRemove[l]];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }
    newState.push({ ...stateCopy });
  }
  return newState;
}

module.exports = transformStateWithClones;
