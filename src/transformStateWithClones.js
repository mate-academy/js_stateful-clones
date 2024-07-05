'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateCopyList = [];

  const oneAction = (task) => {
    switch (task.type) {
      case 'addProperties':
        Object.assign(stateCopy, task.extraData);
        break;
      case 'removeProperties':
        task.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
    }

    stateCopyList.push({ ...stateCopy });
  };

  actions.forEach(oneAction);

  return stateCopyList;
}

module.exports = transformStateWithClones;
