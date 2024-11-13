'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResults = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (arrayResults.length === 0) {
          arrayResults.push(Object.assign({}, state, action.extraData));
        } else {
          arrayResults.push(
            Object.assign(
              {},
              arrayResults[arrayResults.length - 1],
              action.extraData,
            ),
          );
        }
        break;

      case 'removeProperties':
        if (arrayResults.length === 0) {
          const newState = { ...state };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
          arrayResults.push(newState);
        } else {
          const newState = { ...arrayResults[arrayResults.length - 1] };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
          arrayResults.push(newState);
        }
        break;

      case 'clear':
        if (arrayResults.length === 0) {
          const newState = { ...state };

          for (const key in newState) {
            delete newState[key];
          }
          arrayResults.push(newState);
        } else {
          const newState = { ...arrayResults[arrayResults.length - 1] };

          for (const key in newState) {
            delete newState[key];
          }
          arrayResults.push(newState);
        }
        break;
    }
  }

  return arrayResults;
}

module.exports = transformStateWithClones;
