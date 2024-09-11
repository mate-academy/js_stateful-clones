'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        const StateBfAdd = { ...(newStates[newStates.length - 1] || state) };

        newStates.push({ ...StateBfAdd, ...action.extraData });
        break;
      case 'removeProperties':
        const stateBfRemove = { ...(newStates[newStates.length - 1] || state) };

        action.keysToRemove.forEach((key) => {
          if (Object.keys(stateBfRemove).includes(key)) {
            delete stateBfRemove[key];
          }
        });
        newStates.push({ ...stateBfRemove });
        break;
      case 'clear':
        newStates.push({});
        break;
      default:
        newStates.push({ ...state });
        break;
    }
  });

  return newStates;
}

module.exports = transformStateWithClones;
