'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const recievedStates = [];
  let stateCopy = Object.assign({}, state);

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        recievedStates.push({ ...stateCopy });
        break;
      case 'removeProperties':
        const newState = { ...stateCopy };

        action.keysToRemove.forEach((removedKey) => {
          delete newState[removedKey];
        });
        stateCopy = newState;
        recievedStates.push({ ...stateCopy });
        break;
      case 'clear':
        stateCopy = {};
        recievedStates.push({ ...stateCopy });
    }

    // if (action.type === 'addProperties') {
    //   stateCopy = { ...stateCopy, ...action.extraData };
    //   recievedStates.push({ ...stateCopy });
    // } else if (action.type === 'removeProperties') {
    //   const newState = { ...stateCopy };

    //   action.keysToRemove.forEach((removedKey) => {
    //     delete newState[removedKey];
    //   });
    //   stateCopy = newState;
    //   recievedStates.push({ ...stateCopy });
    // } else if (action.type === 'clear') {
    //   stateCopy = {};
    //   recievedStates.push({ ...stateCopy });
    // }
  });

  return recievedStates;
}

module.exports = transformStateWithClones;
