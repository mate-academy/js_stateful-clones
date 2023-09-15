'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const options = Object.values(actions);
  const result = [];

  for (const option of options) {
    const { keysToRemove, type, extraData } = option;
    const stateCopy = { ...state };

    switch (type) {
      case 'addProperties':
        let lastElementOfArray = null;

        if (result[result.length - 1]) {
          lastElementOfArray = Object.assign({}, result[result.length - 1],
            extraData);
        } else {
          lastElementOfArray = Object.assign(stateCopy, extraData);
        }
        result.push(lastElementOfArray);
        break;

      case 'removeProperties':
        let lastElementToRemove = null;

        if (result[result.length - 1]) {
          lastElementToRemove = Object.assign({}, result[result.length - 1]);
        } else {
          lastElementToRemove = Object.assign(stateCopy);
        }

        keysToRemove.forEach(key => delete lastElementToRemove[key]);

        result.push(lastElementToRemove);
        break;

      default:
        result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
