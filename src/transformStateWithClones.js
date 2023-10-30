'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    transform(copyState, action);
    result.push({ ...copyState });
  }

  return result;
}

function transform(copyState, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(copyState, action.extraData);

      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }

      break;

    case 'clear':
      for (const key in copyState) {
        delete copyState[key];
      }
  }
}

module.exports = transformStateWithClones;
