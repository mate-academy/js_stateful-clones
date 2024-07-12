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

    const obj =
      states.length === 0 ? { ...state } : { ...states[states.length - 1] };

    switch (type) {
      case 'addProperties':
        const newObj = {
          ...obj,
          ...extraData,
        };

        states.push(newObj);
        break;
      case 'removeProperties':
        keysToRemove.forEach((element) => {
          delete obj[element];
        });
        states.push(obj);
        break;
      case 'clear':
        Object.keys(obj).forEach((element) => {
          delete obj[element];
        });
        states.push(obj);
        break;
      default:
        throw new Error(`Unknow type: ${type}`);
    }
  }

  return states;
}

module.exports = transformStateWithClones;
