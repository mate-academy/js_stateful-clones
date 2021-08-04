'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changeList = [];
  let stateCopy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(stateCopy, object.extraData);
        break;

      case 'removeProperties':
        object.keysToRemove.forEach(element => {
          delete stateCopy[element];
        });
        break;

      case 'clear':
        stateCopy = {};
    }

    changeList.push({ ...stateCopy });
  }

  return changeList;
}

module.exports = transformStateWithClones;
