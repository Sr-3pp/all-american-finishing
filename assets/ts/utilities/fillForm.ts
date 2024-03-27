export const fillForm = (
  form: any,
  data: any,
  notRequired: Array<string> = ["password"]
) => {
  form.value.forEach((fieldset: any) => {
    fieldset.fields.forEach((field: any) => {
      if (notRequired.includes(field.props.name)) {
        field.props.required = false;
        return;
      } else if (field.props.name.includes(".")) {
        const getValue = (path: string, obj: any): string | number => {
          const keys = path.split(".");
          const parentKey: any = keys.shift();
          if (keys.length === 0) {
            return obj[parentKey];
          } else {
            return getValue(keys.join("."), obj[parentKey]);
          }
        };
        const value = getValue(field.props.name, data);
        field.props.value = value;
      } else if (field.props.type === "file") {
      } else {
        field.props.value = data[field.props.name];
      }
    });
  });
};
