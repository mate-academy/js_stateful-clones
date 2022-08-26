'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  let arrActions = [];

  for (const act of actions) {
    if (act.type === 'clear') {
      newState = {};
      arrActions = [...arrActions, newState];
    }

    if (act.type === 'addProperties') {
      const extraData = act.extraData;

      newState = {
        ...newState,
        ...extraData,
      };
      arrActions = [...arrActions, newState];
    }

    if (act.type === 'removeProperties') {
      let newKeys = Object.keys(newState);

      for (const remKey of act.keysToRemove) {
        newKeys = [...newKeys.filter((i) => i !== remKey)];
      }

      newState = newKeys.reduce((acc, key) => {
        return {
          ...acc,
          [key]: newState[key],
        };
      }, {});

      arrActions = [...arrActions, newState];
    }
  }

  return arrActions;
}

module.exports = transformStateWithClones;
