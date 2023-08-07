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
        newState = Object.assign(newState, extraDatavalue);

        break;

      case 'removeProperties':
        for (const willDeletted of removeValue) {
          delete newState[willDeletted];
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
