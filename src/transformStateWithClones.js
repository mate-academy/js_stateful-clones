'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let count = 0;

  const actionsResult = [];

  let stateCopy = {};

  switch (count) {
    case 0:
      stateCopy = { ...state };
      break;
    case 1:
      stateCopy = actionsResult[0];
      break;
    case count > 1:
      stateCopy = actionsResult[count];
      break;
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    const actionType = {
      [type]: type,
    };

    switch (type) {
      case actionType.clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case actionType.addProperties:
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case actionType.removeProperties:
        keysToRemove.forEach(element => delete stateCopy[element]);
        break;

      default:
        return 'invalid action';
    }

    const newState = { ...stateCopy };

    actionsResult.push(newState);

    count++;
  }

  return actionsResult;
}

module.exports = transformStateWithClones;
