import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { blankForm } from "../reducers";
import { ApplicantArrayFormType } from "../schema";
import { ApplicantFormRow } from "./ApplicantFormRow";

export const MAX_ADDITION = 5;

export function ApplicantFormArray({
  shouldHaveAPrimary
}: {
  shouldHaveAPrimary: boolean;
}) {
  const { control, setValue } = useFormContext<ApplicantArrayFormType>();
  const { fields, append, remove, update } = useFieldArray({
    name: "applicants",
    control
  });

  const fieldValues: ApplicantArrayFormType["applicants"] = useWatch({
    name: "applicants"
  });

  const removable = fields.length > 1;

  const handleRemove = (idx: number) => {
    if (
      shouldHaveAPrimary &&
      (fields.length == 2 || fieldValues[idx].isPrimary)
    ) {
      // We just need to pre-compute so we can set the 1st remaining applicant as primary
      const newField = fieldValues.find((f, fIdx) => fIdx != idx);
      remove(idx);
      if (newField) update(0, { ...newField, isPrimary: true });
    } else {
      remove(idx);
    }
  };

  const handleTogglePrimary = (idx: number, checked: boolean) => {
    if (checked) {
      const currentPrimaryIdx = fieldValues.findIndex(
        (f, fIdx) => f.isPrimary && fIdx !== idx
      );

      setValue(`applicants.${currentPrimaryIdx}.isPrimary`, false);
      update(currentPrimaryIdx, {
        ...fieldValues[currentPrimaryIdx],
        isPrimary: false
      });
    }
  };

  return (
    <VStack gap={4}>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Primary</Th>
              <Th>Lastname</Th>
              <Th>Firstname</Th>
              <Th>Email</Th>
              <Th>Mobile No.</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((field, index) => (
              <ApplicantFormRow
                index={index}
                id={field.id}
                key={field.id}
                onRemove={() => handleRemove(index)}
                onTogglePrimary={(checked) =>
                  handleTogglePrimary(index, checked)
                }
                shouldHaveAPrimary={shouldHaveAPrimary}
                removable={removable}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent={"end"} w="full">
        <Button
          type="button"
          variant="ghost"
          isDisabled={fields.length >= MAX_ADDITION}
          onClick={() => append(blankForm(), { shouldFocus: false })}
        >
          Add More +
        </Button>
      </HStack>
    </VStack>
  );
}
