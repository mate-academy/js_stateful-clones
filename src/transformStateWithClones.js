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
  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (i > 0) {
      stateCopy = Object.assign({}, newState[i - 1]);
    }

    let currentItem = {};

    switch (type) {
      case 'addProperties':
        currentItem = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (const key in stateCopy) {
          for (let l = 0; l < keysToRemove.length; l++) {
            if (key === keysToRemove[l]) {
              delete stateCopy[key];
            }
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
