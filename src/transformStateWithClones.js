'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const objectsModified = [];
  const tempObject = {
    ...state,
  };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempObject, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete tempObject[key];
        });
        break;
      case 'clear':
        Object.keys(tempObject).forEach(key => {
          delete tempObject[key];
        });
    }

    objectsModified.push({
      ...tempObject,
    });
  });

  return objectsModified;
}

module.exports = transformStateWithClones;
