type courtConfig = {
  [courtType: string]: number;
};

type courtCapacity = {
  [courtType: string]: number;
};

const config: courtConfig = {
  Tennis: 4,
  Auxiliary: 2,
  Arena: 4,
};

export const capacity: courtCapacity = {
  Tennis: 4,
  Auxiliary: 10,
  Arena: 10,
};

const getCourtTypes = () => {
  let res: string[] = [];
  Object.keys(config).forEach((type) => {
    res.push(type);
  });
  return res;
};

export const getCourts = (type: string) => {
  let res: string[] = [];
  for (let i = 1; i <= config[type]; i++) {
    res.push("Court " + i);
  }
  return res;
};

export const courtTypes: string[] = getCourtTypes();
