'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = Object.assign({}, state);
  const modifiedStates = actions.map(action => {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }

        const withAdd = Object.assign({}, currentState);

        return withAdd;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete currentState[value];
        }

        const withRemove = Object.assign({}, currentState);

        return withRemove;

      case 'clear':
        if (Object.keys(currentState).length === 0) {
          return {};
        }

        for (const key in currentState) {
          delete currentState[key];
        }

        const withClear = Object.assign({}, currentState);

        return withClear;
    }
  });

  return modifiedStates;
}

module.exports = transformStateWithClones;
