'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let stateCopy = {
    ...state,
  };

  actions.forEach(el => {
    stateCopy = {
      ...stateCopy,
    };

    if (el.type === 'addProperties') {
      Object.assign(stateCopy, el.extraData);
    }

    if (el.type === 'removeProperties') {
      el.keysToRemove.forEach(key => {
        delete stateCopy[key];
      });
    }

    if (el.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    clones.push(stateCopy);
  });

  return clones;
}

module.exports = transformStateWithClones;
