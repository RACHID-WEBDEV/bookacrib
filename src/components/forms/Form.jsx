import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

function HookForm({
  onSubmit,
  children,
  schema,
  defaultValues,
  resetAfterSubmit = false,
}) {
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && resetAfterSubmit) {
      methods.reset();
    }
  }, [methods.formState.isSubmitSuccessful, methods, resetAfterSubmit]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

HookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  schema: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  resetAfterSubmit: PropTypes.bool,
};

export default HookForm;
