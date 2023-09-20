'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyArray = [];
  let stateCopy = Object.assign({}, state);

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(stateCopy, i.extraData);
        break;

      case 'removeProperties':
        i.keysToRemove.forEach((el) => {
          delete stateCopy[el];
        }, {});
        break;

      case 'clear': stateCopy = {};
        break;

      default: throw new Error('Write a valid property');
    }

    stateCopyArray.push({ ...stateCopy });
  }

  return stateCopyArray;
}

module.exports = transformStateWithClones;
