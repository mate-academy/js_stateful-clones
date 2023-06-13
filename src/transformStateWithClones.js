'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const generalArray = [];
  const modifiedState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(modifiedState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete modifiedState[key];
        };
        break;
      }

      case 'clear': {
        for (const key of Object.keys(modifiedState)) {
          delete modifiedState[key];
        };
        break;
      }

      default: {
        throw new Error('Error');
      }
    };
    generalArray.push({ ...modifiedState });
  };

  return generalArray;
};

module.exports = transformStateWithClones;
