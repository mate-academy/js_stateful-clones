'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  actions.forEach((action) => {
    newState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((elem) => delete newState[elem]);
        break;

      case 'clear':
        newState = {};
        break;
    }

    result.push(newState);
  });

  return result;
}

module.exports = transformStateWithClones;
