'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyList = [];

  const oneAction = (task) => {
    const stateCopy =
      stateCopyList[0] !== undefined
        ? { ...stateCopyList[stateCopyList.length - 1] }
        : { ...state };

    switch (task.type) {
      case 'addProperties':
        Object.assign(stateCopy, task.extraData);
        break;
      case 'removeProperties':
        task.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
      default:
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        Object.assign(stateCopy, { error: `${task.type} is not available.` });
    }

    return stateCopy;
  };

  actions.forEach((task) => stateCopyList.push(oneAction(task)));

  return stateCopyList;
}

module.exports = transformStateWithClones;
