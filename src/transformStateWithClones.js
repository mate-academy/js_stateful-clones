'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneArray = [];
  let indexLastActions = 0;

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        stateCloneArray.push(Object.assign({}));
        break;

      case 'addProperties':

        if (!stateCloneArray.length) {
          stateCloneArray.push(Object.assign({}, state, extraData));
          break;
        }

        indexLastActions = stateCloneArray.length - 1;

        stateCloneArray.push(
          Object.assign({}, stateCloneArray[indexLastActions], extraData)
        );

        break;

      default:
        if (!stateCloneArray.length) {
          stateCloneArray.push(Object.assign({}, state));

          Object.values(keysToRemove).forEach((removeProperties) => {
            if (removeProperties in stateCloneArray[0]) {
              delete stateCloneArray[0][removeProperties];
            }
          });
          break;
        }

        indexLastActions = stateCloneArray.length - 1;

        stateCloneArray.push(
          Object.assign({}, stateCloneArray[indexLastActions])
        );

        indexLastActions += 1;

        Object.values(keysToRemove).forEach((removeProperties) => {
          if (removeProperties in stateCloneArray[indexLastActions]) {
            delete stateCloneArray[indexLastActions][removeProperties];
          }
        });

        break;
    }
  });

  return stateCloneArray;
}

module.exports = transformStateWithClones;
