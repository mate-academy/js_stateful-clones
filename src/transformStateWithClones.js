'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const newState = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }
        }

        currentState = newState;
        break;
    }

    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;
