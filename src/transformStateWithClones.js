'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = ({ ...state });
  const arrayFromState = [];

  for (let i = 0; i < actions.length; i++) {
    const extraDatavalue = actions[i].extraData;
    const typeOfAction = actions[i].type;
    const removeValue = actions[i].keysToRemove;

    switch (typeOfAction) {
      case 'addProperties':
        for (const newProperty in extraDatavalue) {
          newState[newProperty] = extraDatavalue[newProperty];
        }
        arrayFromState.push({ ...newState });
        break;

      case 'removeProperties':
        for (let j = 0; j < removeValue.length; j++) {
          delete newState[removeValue[j]];
        }
        arrayFromState.push({ ...newState });
        break;

      default:
        Object.keys(newState).forEach(key => delete newState[key]);
        arrayFromState.push({ ...{} });
    }
  }

  return arrayFromState;
}

module.exports = transformStateWithClones;
