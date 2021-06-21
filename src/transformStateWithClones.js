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

  const savingState = (currentState) => {
    arrStore.push({ ...currentState });
  };

  for (const key in actions) {
    const actionType = actions[key].type;

    if (actionType === 'addProperties') {
      addingProperties(actions[key].extraData);
      savingState(copySate);
    };

    if (actionType === 'removeProperties') {
      removingProperties(actions[key].keysToRemove);
      savingState(copySate);
    };

    if (actionType === 'clear') {
      clearingObj(copySate);
      savingState(copySate);
    };
  };

  return arrStore;
};

module.exports = transformStateWithClones;
