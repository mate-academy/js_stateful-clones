'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrStore = [];
  const copySate = { ...state };

  const addingProperties = (data) => {
    Object.assign(copySate, data);
  };

  const removingProperties = (arrProps) => {
    for (const prop in arrProps) {
      const valueArrProps = arrProps[prop];

      if (copySate[valueArrProps] === undefined) {
        continue;
      };
      delete copySate[valueArrProps];
    };
  };

  const clearingObj = (obj) => {
    for (const prop in obj) {
      if (obj[prop] === undefined) {
        continue;
      };
      delete obj[prop];
    };
  };

  const savegState = (currentState) => {
    arrStore.push({ ...currentState });
  };

  for (const key in actions) {
    const actionType = actions[key].type;

    if (actionType === 'addProperties') {
      addingProperties(actions[key].extraData);
    };

    if (actionType === 'removeProperties') {
      removingProperties(actions[key].keysToRemove);
    };

    if (actionType === 'clear') {
      clearingObj(copySate);
    };
    savegState(copySate);
  };

  return arrStore;
};

module.exports = transformStateWithClones;
