'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const multipleStateArr = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copyState, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach(key => {
          delete copyState[key];
        });
        break;
      }

      case 'clear': {
        for (const data in copyState) {
          delete copyState[data];
        }
        break;
      }

      default:
        return `Sorry i don't know this action`;
    }

    multipleStateArr.push({ ...copyState });
  });

  return multipleStateArr;
}

module.exports = transformStateWithClones;
