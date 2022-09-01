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
        if (resultArray.length === 0) {
          resultArray.push(Object.assign({}, state, actions[i].extraData));
        } else {
          resultArray.push(Object.assign({},
            resultArray[i - 1], actions[i].extraData));
        }
        break;
      case 'removeProperties':
        if (resultArray.length === 0) {
          removePropertiesClone = Object.assign({}, state);

          for (const keyToRemove of actions[i].keysToRemove) {
            delete removePropertiesClone[keyToRemove];
          }
          resultArray.push(removePropertiesClone);
        } else {
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
