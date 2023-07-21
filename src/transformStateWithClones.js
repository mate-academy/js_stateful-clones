'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCloneArray = [];
  let checkStateObject = Object.assign({}, state);

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        checkStateObject = Object.assign(
          {},
          checkStateObject
        );

        for (const stateProper in checkStateObject) {
          if (checkStateObject.hasOwnProperty(stateProper)) {
            delete checkStateObject[stateProper];
          }
        }

        stateCloneArray.push(
          checkStateObject
        );

        break;

      case 'addProperties':
        stateCloneArray.push(
          checkStateObject = Object.assign(
            {},
            checkStateObject,
            extraData,
          )
        );

        break;

      case 'removeProperties':
        checkStateObject = Object.assign(
          {},
          checkStateObject
        );

        keysToRemove.forEach((removeProperties) => {
          if (removeProperties in checkStateObject) {
            delete checkStateObject[removeProperties];
          }
        });

        stateCloneArray.push(
          checkStateObject
        );

        break;

      default:
        return 'Something went wrong';
    }
  });

  return stateCloneArray;
}

module.exports = transformStateWithClones;
