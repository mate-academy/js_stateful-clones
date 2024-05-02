'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = [];
  let stateCopy = { ...state };

  for (const act in actions) {
    switch (actions[act].type) {
      case 'addProperties':
        const addCopy = { ...stateCopy, ...actions[act].extraData };

        resultObject.push(addCopy);

        stateCopy = addCopy;
        break;
      case 'removeProperties':
        const removeCopy = { ...stateCopy };

        for (const key of actions[act].keysToRemove) {
          delete removeCopy[key];
        }

        resultObject.push(removeCopy);

        stateCopy = removeCopy;
        break;
      case 'clear':
        const clearObj = {};

        resultObject.push(clearObj);

        stateCopy = clearObj;
        break;
    }
  }

  return resultObject;
}

module.exports = transformStateWithClones;
