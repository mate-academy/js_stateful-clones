'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let removePropertiesClone = {};

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        switch (resultArray.length) {
          case 0:
            resultArray.push(Object.assign({}, state, actions[i].extraData));
            break;
          default:
            resultArray.push(Object.assign({
            }, resultArray[i - 1], actions[i].extraData));
        }
        break;
      case 'removeProperties':
        switch (resultArray.length) {
          case 0:
            removePropertiesClone = Object.assign({}, state);

            for (const keyToRemove of actions[i].keysToRemove) {
              delete removePropertiesClone[keyToRemove];
            }
            resultArray.push(removePropertiesClone);
            break;
          default:
            removePropertiesClone = Object.assign({}, resultArray[i - 1]);

            for (const keyToRemove of actions[i].keysToRemove) {
              delete removePropertiesClone[keyToRemove];
            }
            resultArray.push(removePropertiesClone);
        }
        break;
      default:
        resultArray.push({});
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
