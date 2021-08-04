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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(element => {
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
