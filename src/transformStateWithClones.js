'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let prevState = { ...state };

  for (const action of actions) {
    let stateOnIteration = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        stateOnIteration = {
          ...stateOnIteration,
          ...action.extraData,
        };

        prevState = { ...stateOnIteration };

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateOnIteration[key]) {
            delete stateOnIteration[key];
          }
        }

        prevState = { ...stateOnIteration };

        break;

      case 'clear':
        stateOnIteration = {};

        prevState = { ...stateOnIteration };

        break;

      default:
        throw new Error('uncertain action type');
    }

    statesHistory.push(stateOnIteration);
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
