import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export function ApplicantFormField({
  id,
  placeholder
}: {
  id: string;
  placeholder: string;
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const errorMessage = id.split(".").reduce((prev, curr) => {
    return prev?.[curr]?.message ? prev[curr]?.message : prev?.[curr];
  }, errors as any);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <Input placeholder={placeholder} {...register(id)} width="full" />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
