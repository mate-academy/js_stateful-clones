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
  for (let action in actions) {
    const { type, extraData, keysToRemove } = actions[action];

    if (action > 0) {
      stateCopy = Object.assign({}, newState[action - 1]);
    }

    let currentItem = {};

    switch (type) {
      case 'addProperties':
        currentItem = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (const key in stateCopy) {
          for (let l = 0; l < keysToRemove.length; l++) {
            delete stateCopy[keysToRemove[l]];
          }
        }
        currentItem = { ...stateCopy };
        break;

      case 'clear':
        break;
    }
    newState.push(currentItem);
  }
  return newState;
}

module.exports = transformStateWithClones;
