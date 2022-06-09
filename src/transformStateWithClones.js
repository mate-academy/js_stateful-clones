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
    const nextState = (i === 0) ? { ...state } : { ...resultStates[i - 1] };

    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case ('addProperties'):
        Object.assign(nextState, extraData);
        break;

      case ('removeProperties'):
        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;

      case ('clear'):
        for (const key in nextState) {
          delete nextState[key];
        }
        break;
    }

    resultStates.push(nextState);
  }

  return resultStates;
}

module.exports = transformStateWithClones;
