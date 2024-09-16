'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objectWeWorkWith = { ...state };
  const finalArr = [];

  for (const action of actions) {
    const objectToChange = { ...objectWeWorkWith };

    objectWeWorkWith = transformState(objectToChange, action);
    finalArr.push({ ...objectWeWorkWith });
  }

  return finalArr;
}

function transformState(objectToChange, action) {
  const objectWeWorkWith = { ...objectToChange };

  switch (action.type) {
    case 'addProperties': {
      Object.assign(objectWeWorkWith, action.extraData);

      break;
    }

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete objectWeWorkWith[key];
      }

      break;
    }

    case 'clear': {
      for (const key of Object.keys(objectWeWorkWith)) {
        delete objectWeWorkWith[key];
      }

      break;
    }
  }

  return objectWeWorkWith;
}
module.exports = transformStateWithClones;
