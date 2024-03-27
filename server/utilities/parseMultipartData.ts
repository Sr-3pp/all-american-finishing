export const parseMultipartData = (data: any) => {
  const parsedData: any = {};
  data.forEach((el: any) => {
    const key = el.name;
    if (key !== "_id" && key.includes("_")) {
      const [name] = key.split("_");
      if (!parsedData[name]) {
        parsedData[name] = [];
      }

      if ("filename" in el) {
        parsedData[name].push(el);
      } else {
        parsedData[name].push(el.data.toString());
      }
    } else if (key.includes(".")) {
      const getValue: any = (_key: string, obj: any) => {
        const keys = _key.split(".");
        const firstKey = keys.shift();
        if (keys.length > 0) {
          return getValue(keys.join("."), obj[firstKey as string]);
        } else {
          return (obj[firstKey as string] = el.data.toString());
        }
      };
      getValue(key, parsedData);
    } else {
      parsedData[key] = el.data.toString();
    }
  });

  return parsedData;
};
