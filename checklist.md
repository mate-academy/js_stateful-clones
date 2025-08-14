1. [CODE STYLE] - don't mutate object or arrays - it will cause unexpected results later on. You should make copy using `Object.assign` or `spread` operator
2. [CODE STYLE]: Use switch statement if you have limited amount of conditions.
3. [CODE STYLE]: switch/case should always have default case for error handling.
4. [DONT REPEAT YOURSELF] - If you perform same action in all `switch` cases - do it just once afterwards.

5. [NAMING] - use proper names for object copy 


BAD EXAMPLE:
```
const copy = { ...state }

```

GOOD EXAMPLE: 
```
const stateCopy = { ...state }
```
  /*
  
  1. [СТИЛЬ КОДУ] - не змінюйте об'єкти або масиви - це може призвести до несподіваних результатів у майбутньому. Слід створювати копії за допомогою оператора `Object.assign` або `spread`.
2. [СТИЛЬ КОДУ]: використовуйте оператор switch, якщо кількість умов обмежена.
3. [СТИЛЬ КОДУ]: switch/case завжди повинен мати стандартний випадок для обробки помилок.
4. [НЕ ПОВТОРЮЙТЕ СЕБЕ] - Якщо ви виконуєте одну і ту ж дію у всіх випадках `switch` - зробіть це тільки один раз після цього.

5. [НАЗВАННЯ] - використовуйте правильні імена для копії об'єкта 


ПОГАНИЙ ПРИКЛАД:
```
const copy = { ...state }

Translated with DeepL.com (free version)
  */