'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStateArr = [];

  for (let index = 0; index < actions.length; index++) {
    let newState = {};
    const lastState = newStateArr[index - 1] || state;

    const actionType = actions[index].type;
    const actionExtraDate = actions[index].extraData;

    switch (actionType) {
      case 'addProperties': {
        newState = {
          ...lastState,
          ...actionExtraDate,
        };
        newStateArr.push(newState);
        break;
      }

      case 'removeProperties': {
        newState = { ...lastState };

        for (let key = 0; key < actions[index].keysToRemove.length; key++) {
          delete newState[actions[index].keysToRemove[key]];
        }

        newStateArr.push(newState);
        break;
      }

      case 'clear': {
        newStateArr.push({ });
        break;
      }

      default: {
        throw new Error(`Unsopported action type: ${actionType}`);
      }
    }
  }

  return newStateArr;
}

module.exports = transformStateWithClones;
