'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCloneArray = [];
  let checkState = Object.assign({}, state);

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        checkState = Object.assign({}, checkState);

        for (const stateProper in checkState) {
          if (checkState.hasOwnProperty(stateProper)) {
            delete checkState[stateProper];
          }
        }

        stateCloneArray.push(checkState);

        break;

      case 'addProperties':
        stateCloneArray.push(
          checkState = Object.assign(
            {}, checkState, extraData,
          )
        );

        break;

      case 'removeProperties':
        checkState = Object.assign(
          {}, checkState
        );

        keysToRemove.forEach((removeProperties) => {
          if (removeProperties in checkState) {
            delete checkState[removeProperties];
          }
        });

        stateCloneArray.push(
          checkState
        );

        break;

      default:
        return 'Something went wrong';
    }
  });

  return stateCloneArray;
}

module.exports = transformStateWithClones;
