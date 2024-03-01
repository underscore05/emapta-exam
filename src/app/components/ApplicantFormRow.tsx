import { Button, Td, Tr } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";

import { ApplicantFormField } from "./ApplicantFormField";
import { CheckboxCustom } from "./CheckboxCustom";

export function ApplicantFormRow({
  index,
  id,
  onRemove,
  onTogglePrimary,
  shouldHaveAPrimary,
  removable
}: {
  id: string;
  index: number;
  onRemove: () => void;
  onTogglePrimary: (checked: boolean) => void;
  removable?: boolean;
  shouldHaveAPrimary?: boolean;
}) {
  const { register, control } = useFormContext();
  const isPrimary = useWatch({
    name: `applicants.${index}.isPrimary`,
    control
  });

  return (
    <Tr key={`applicant-${id}-row`} verticalAlign="top">
      <Td>
        <CheckboxCustom
          control={control}
          // Allow un-checking if there's a primary in outside list
          isReadOnly={isPrimary && shouldHaveAPrimary}
          {...register(`applicants.${index}.isPrimary`)}
          onToggle={(checked) => onTogglePrimary(checked)}
        />
      </Td>
      <Td>
        <ApplicantFormField
          id={`applicants.${index}.lastName`}
          placeholder="Enter lastname"
        />
      </Td>
      <Td>
        <ApplicantFormField
          id={`applicants.${index}.firstName`}
          placeholder="Enter firstname"
        />
      </Td>
      <Td>
        <ApplicantFormField
          id={`applicants.${index}.email`}
          placeholder="Enter email"
        />
      </Td>
      <Td>
        <ApplicantFormField
          id={`applicants.${index}.mobileNumber`}
          placeholder="Enter mobile number"
        />
      </Td>

      <Td>
        <Button
          onClick={onRemove}
          colorScheme="red"
          isDisabled={!removable || isPrimary}
        >
          Remove
        </Button>
      </Td>
    </Tr>
  );
}
