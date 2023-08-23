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
    const secondValue = action.extraData;
    const keyRemove = action.keysToRemove;

    switch (TYPE_MESSAGE) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...secondValue,
        };

        lengthActions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of keyRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        lengthActions.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        lengthActions.push({ ...stateCopy });
        break;
    }
  }

  return lengthActions;
}

module.exports = transformStateWithClones;
