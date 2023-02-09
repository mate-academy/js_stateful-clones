'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfAcrions = [];
  let currentAction = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        let addAction = { ...currentAction };

        addAction = Object.assign(addAction, action.extraData);

        arrayOfAcrions.push(addAction);
        currentAction = addAction;
        break;

      case 'removeProperties':
        const removeAction = { ...currentAction };

        for (const property of action.keysToRemove) {
          delete removeAction[property];
        }
        arrayOfAcrions.push(removeAction);
        currentAction = removeAction;
        break;

      default:
        arrayOfAcrions.push({});
        currentAction = {};
    }
  }

  return arrayOfAcrions;
}

module.exports = transformStateWithClones;
