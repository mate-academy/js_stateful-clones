'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  actions.forEach((el, index) => {
    const { type, extraData = {}, keysToRemove = [] } = el;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(stateCopy, key)) {
            delete stateCopy[key];
          }
        });
        break;
      default:
        throw new Error(`No cases for type: ${type}`);
    }

    result.push(stateCopy);
    stateCopy = { ...stateCopy };
  });

  return result;
}

module.exports = transformStateWithClones;
