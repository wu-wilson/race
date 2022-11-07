import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const TextField = ({label, ...props}: any) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.touched === true && meta.error) ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
