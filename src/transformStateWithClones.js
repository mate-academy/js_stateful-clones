'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const clonedState = { ...state };

  if (actions) {
    actions.forEach(function(item) {
      if (item.type === 'addProperties') {
        for (const [key, value] of Object.entries(item.extraData)) {
          clonedState[key] = value;
        }
        arr.push({ ...clonedState });
      } else if (item.type === 'removeProperties') {
        if (item.keysToRemove !== undefined && item.keysToRemove !== null) {
          item.keysToRemove.forEach(function(value) {
            delete clonedState[value];
          });
        }
        arr.push({ ...clonedState });
      } else if (item.type === 'clear') {
        for (const key in clonedState) {
          if (clonedState.hasOwnProperty(key)) {
            delete clonedState[key];
          }
        }
        arr.push({ ...clonedState });
      }
    });

    return arr;
  }
}

transformStateWithClones();

module.exports = transformStateWithClones;
