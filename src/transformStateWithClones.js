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
    const { type, extraData, keysToRemove } = actions[act];

    switch (type) {
      case 'addProperties':
        const addCopy = { ...stateCopy, ...extraData };

        resultObject.push(addCopy);

        stateCopy = addCopy;
        break;
      case 'removeProperties':
        const removeCopy = { ...stateCopy };

        for (const key of keysToRemove) {
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
