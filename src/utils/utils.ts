export const getObjectDiff = <T extends {}>(obj1: T, obj2: T) =>
  (Object.keys(obj1) as (keyof T)[]).reduce((acc, key) => {
    if (obj1[key] !== obj2[key]) {
      acc[key] = obj2[key];
    }
    return acc;
  }, {} as Partial<T>);
