'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneState = { ...state };

  actions.forEach((action) => {
    let nextState = { ...cloneState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;
    }
    result.push(nextState);
    cloneState = nextState;
  });

  return result;
}

module.exports = transformStateWithClones;
