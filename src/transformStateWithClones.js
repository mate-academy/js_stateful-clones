'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClones = [];
  const clone = structuredClone(state);

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      addProperties(clone, action.extraData);
    } else if (action.type === 'removeProperties') {
      removeProperties(clone, action.keysToRemove);
    } else {
      clear(clone);
    }
    stateClones.push(structuredClone(clone));
  });

  return stateClones;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
