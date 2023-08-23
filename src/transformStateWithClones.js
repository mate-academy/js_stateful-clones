'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const lengthActions = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const TYPE_MESSAGE = action.type;
    const ADD = 'addProperties';
    const REMOVE = 'removeProperties';
    const CLEAR = 'clear';
    const secondValue = action.extraData;
    const keyRemove = action.keysToRemove;

    switch (TYPE_MESSAGE) {
      case ADD:
        stateCopy = {
          ...stateCopy,
          ...secondValue,
        };
        break;

      case REMOVE:
        for (const key of keyRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR:
        stateCopy = {};
        break;
    }

    lengthActions.push({ ...stateCopy });
  }

  return lengthActions;
}

module.exports = transformStateWithClones;
