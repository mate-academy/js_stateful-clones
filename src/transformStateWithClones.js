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
      switch (item.type) {
        case 'addProperties': {
          for (const [key, value] of Object.entries(item.extraData)) {
            clonedState[key] = value;
          }
          break;
        }

        case 'removeProperties': {
          item.keysToRemove.forEach(function(value) {
            delete clonedState[value];
          });
          break;
        }

        case 'clear': {
          for (const key in clonedState) {
            if (clonedState.hasOwnProperty(key)) {
              delete clonedState[key];
            }
          }
          break;
        }
      }

      arr.push({ ...clonedState });
    });
  }

  return arr;
}

transformStateWithClones();

module.exports = transformStateWithClones;
