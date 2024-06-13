'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let anotherState = {};
  const massState = [];

  if (state) {
    anotherState = { ...state };
  }

  for (const action in actions) {
    const {
      type: anotherType,
      extraData: anotherExtraData = {},
      keysToRemove: anotherKeysToRemove = [],
    } = actions[action];

    if (anotherType === 'addProperties') {
      Object.assign(anotherState, anotherExtraData);
      massState.push(anotherState);
    }
    // return anotherState;

    if (anotherType === 'removeProperties') {
      for (const del in anotherKeysToRemove) {
        if (anotherState[anotherKeysToRemove[del]]) {
          delete anotherState[anotherKeysToRemove[del]];
        }
      }
      massState.push(anotherState);
    }

    // return anotherState;

    if (anotherType === 'clear') {
      if (anotherState) {
        for (const delItem in anotherState) {
          delete anotherState[delItem];
        }
      }
      anotherState = {};
      massState.push(anotherState);
    }
  }

  return massState;
}

module.exports = transformStateWithClones;
