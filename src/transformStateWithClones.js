'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copiedState = { ...state };
  const transformedState = [];

  actions.forEach(action => {
    copiedState = { ...copiedState };
    transformedState.push(copiedState);

    switch (action.type) {
      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        };
        break;
      case 'addProperties':
        copiedState = Object.assign(copiedState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete copiedState[key];
        });
        break;
    }
  });

  return transformedState;
}

module.exports = transformStateWithClones;
