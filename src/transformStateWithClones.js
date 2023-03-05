'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultActions = [];
  const copiedObject = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copiedObject, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (copiedObject.hasOwnProperty(key)) {
            delete copiedObject[key];
          }
        });
        break;

      case 'clear':
        for (const key in copiedObject) {
          delete copiedObject[key];
        }
        break;
    }
    resultActions.push({ ...copiedObject });
  });

  return resultActions;
}

module.exports = transformStateWithClones;
