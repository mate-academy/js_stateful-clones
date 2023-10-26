'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrayOfClones = [];
  const updState = { ...state };

  for (const action of actions) {
    transform(updState, action);
    arrayOfClones.push({ ...updState });
  }

  return arrayOfClones;
}

function transform(updState, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(updState, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete updState[key];
      }

      break;

    case 'clear':
      for (const key of Object.keys(updState)) {
        delete updState[key];
      }

      break;
  }
}

module.exports = transformStateWithClones;
