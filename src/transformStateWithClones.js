'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = ({ ...state });
  const renovatedState = [];

  for (const action of actions) {
    const extraDatavalue = action.extraData || {};
    const typeOfAction = action.type;
    const removeValue = action.keysToRemove || {};

    switch (typeOfAction) {
      case 'addProperties':
        for (const newProperty in extraDatavalue) {
          newState[newProperty] = extraDatavalue[newProperty];
        }

        break;

      case 'removeProperties':
        for (let j = 0; j < removeValue.length; j++) {
          delete newState[removeValue[j]];
        }

        break;

      case 'clear':
        newState = {};

        break;

      default:
        throw new Error('Error!');
    }

    renovatedState.push({ ...newState });
  }

  return renovatedState;
}

module.exports = transformStateWithClones;
