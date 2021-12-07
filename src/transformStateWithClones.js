'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const transformStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete cloneState[removeKey];
        }
        break;
      case 'clear':
        cloneState = {};
        break;
    }
    transformStates.push({ ...cloneState });
  };

  return transformStates;
}

module.exports = transformStateWithClones;
