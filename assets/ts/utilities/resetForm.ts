export const resetForm = (form: any) => {
  form.value.forEach((fieldset: any) => {
    fieldset.fields.forEach((field: any) => {
      field.props.value = "";
      if (field.props.name === "password") {
        field.props.required = true;
      }
    });
  });
};
