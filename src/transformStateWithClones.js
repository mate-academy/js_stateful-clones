'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const clonesArray = [];

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        // eslint-disable-next-line no-console
        console.log(`Unexpected type in action ${actions.indexOf(action) + 1}`);
    }
    clonesArray.push({ ...newState });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
