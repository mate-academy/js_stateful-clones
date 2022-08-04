'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {};

  Object.assign(copyState, state);

  const result = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        const { extraData } = action;

        for (const index in extraData) {
          copyState[index] = extraData[index];
        }
        break;

      case action.type === 'removeProperties':
        const { keysToRemove } = action;

        for (const index in keysToRemove) {
          delete copyState[keysToRemove[index]];
        }
        break;

      case action.type === 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
