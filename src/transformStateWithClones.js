'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = [];

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      const add = {
        ...(copy.length
          ? copy[copy.length - 1]
          : state),
        ...action.extraData,
      };

      copy.push(add);
    }

    if (action.type === 'removeProperties') {
      const remove = Object.fromEntries(Object.entries(
        copy.length
          ? copy[copy.length - 1]
          : state)
        .filter(([key]) =>
          !action.keysToRemove.includes(key)));

      copy.push(remove);
    }

    if (action.type === 'clear') {
      const clear = {};

      copy.push(clear);
    }
  });

  return copy;
}

module.exports = transformStateWithClones;
