'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const states = [];

  for (const action of actions) {
    const { type = null, extraData = {}, keysToRemove = [] } = action;

    let newObj;

    if (states.length === 0) {
      newObj = { ...state };
    } else {
      newObj = { ...states[states.length - 1] };
    }

    switch (type) {
      case 'addProperties':
        newObj = Object.assign(newObj, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((element) => {
          if (newObj[element]) {
            delete newObj[element];
          }
        });
        break;
      case 'clear':
        Object.keys(newObj).forEach((element) => {
          delete newObj[element];
        });
        break;
    }

    states.push(newObj);
  }

  return states;
}

module.exports = transformStateWithClones;
