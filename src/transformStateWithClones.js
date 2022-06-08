'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      resultStates.push(
        {
          ...state,
        }
      );
    } else {
      resultStates.push(
        {
          ...resultStates[i - 1],
        }
      );
    }

    switch (actions[i].type) {
      case ('addProperties'):
        Object.assign(resultStates[i], actions[i].extraData);
        break;

      case ('removeProperties'):
        for (const key of actions[i].keysToRemove) {
          delete resultStates[i][key];
        }
        break;

      case ('clear'):
        for (const key in resultStates[i]) {
          delete resultStates[i][key];
        }
        break;
    }
  }

  return resultStates;
}

module.exports = transformStateWithClones;
