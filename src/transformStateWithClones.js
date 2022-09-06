'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [state];
  let removePropertiesClone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        resultArray.push(Object.assign({},
          resultArray[i], actions[i].extraData));
        break;
      case 'removeProperties':
        removePropertiesClone = Object.assign({}, resultArray[i]);

        for (const keyToRemove of actions[i].keysToRemove) {
          delete removePropertiesClone[keyToRemove];
        }
        resultArray.push(removePropertiesClone);
        break;
      default:
        resultArray.push({});
    }
  }

  return resultArray.slice(1);
}

module.exports = transformStateWithClones;
