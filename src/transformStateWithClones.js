'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  let stateCopy = { ...state };
  let pushedCopy = {};

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(stateCopy, object.extraData);
        break;

      case 'removeProperties':
        object.keysToRemove.forEach(Element => {
          delete stateCopy[Element];
        });
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'broken data - input right data';
    }
    pushedCopy = { ...stateCopy };
    array.push(pushedCopy);
  }

  return array;
}

module.exports = transformStateWithClones;
