"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  let objectFromState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    // assign Object after previous changes
    const prevObjectProp = Object.assign({}, objectFromState);

    switch (actions[i].type) {
      case "addProperties":
        Object.assign(prevObjectProp, actions[i].extraData);
        break;

      case "removeProperties":
        const propToDelete = actions[i].keysToRemove;

        for (let j = 0; j < propToDelete.length; j++) {
          delete prevObjectProp[propToDelete[j]];
        }
        break;

      case "clear":
        for (const prop in prevObjectProp) {
          if (prevObjectProp.hasOwnProperty(prop)) {
            delete prevObjectProp[prop];
          }
        }
        break;
    }
    // assign Object after changing it's properties in switch
    objectFromState = Object.assign({}, prevObjectProp);
    arr.push(prevObjectProp);
  }

  return arr;
}

module.exports = transformStateWithClones;
