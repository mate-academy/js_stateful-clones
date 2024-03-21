'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const stateChange = [];

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => delete newState[key]);
        break;
    }
    stateChange.push({ ...newState });
  });

  return stateChange;
}

module.exports = transformStateWithClones;
