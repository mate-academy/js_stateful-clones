"use strict";

function transformStateWithClones(state, actions) {
  const resultArray = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const valueBeforePassing =
      i === 0 ? { ...resultArray[i] } : { ...resultArray[i - 1] };

    switch (actions[i].type) {
      case "addProperties":
        const addProperties = actions[i].extraData;

        resultArray[i] = Object.assign(valueBeforePassing, addProperties);
        break;
      case "removeProperties":
        const arrayElementToDeleted = actions[i].keysToRemove;

        arrayElementToDeleted.forEach((removeElement) => {
          delete valueBeforePassing[removeElement];
        });
        resultArray[i] = valueBeforePassing;
        break;
      case "clear":
        resultArray[i] = {};
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
