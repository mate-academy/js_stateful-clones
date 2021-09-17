'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const transformStates = [];

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(elem => {
        delete cloneState[elem];
      });
    }

    if (action.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }
    transformStates.push({ ...cloneState });
  });

  return transformStates;
}

module.exports = transformStateWithClones;
