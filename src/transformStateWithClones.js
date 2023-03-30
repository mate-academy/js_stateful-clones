'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArray = [state];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        finalArray.push({
          ...finalArray[finalArray.length - 1],
          ...actions[i].extraData,
        });
        break;

      case 'removeProperties':
        const removeKeys = actions[i].keysToRemove;

        finalArray.push(
          Object.fromEntries(
            Object.entries(finalArray[finalArray.length - 1]).filter(
              ([key, value]) => !removeKeys.includes(key)
            )
          )
        );
        break;

      case 'clear':
        finalArray.push({});
        break;

      default:
        break;
    }
  }

  return finalArray.slice(1);
}
module.exports = transformStateWithClones;
