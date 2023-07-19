'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];

  const copyState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);

        break;

      case 'removeProperties':
        const removeKeys = action.keysToRemove.values();

        for (const key of removeKeys) {
          delete copyState[key];
        }

        break;

      case 'clear':

        for (const key in copyState) {
          delete copyState[key];
        }

        break;

      default:
        return state;
    }

    const newState = JSON.parse(JSON.stringify(copyState));

    newArray.push(newState);
  });

  return newArray;
}

module.exports = transformStateWithClones;
