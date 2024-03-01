import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { blankForm } from "../reducers";
import {
  ApplicantArrayFormSchema,
  ApplicantArrayFormType,
  ApplicantFormType
} from "../schema";
import { ApplicantFormArray } from "./ApplicantFormArray";

export function ApplicantForm({
  isOpen,
  onClose,
  onSaveAll,
  shouldHaveAPrimary
}: {
  onSaveAll: (newApplicants: ApplicantFormType[]) => void;
  isOpen: boolean;
  onClose: () => void;
  shouldHaveAPrimary: boolean;
}) {
  const formMethods = useForm({
    mode: "onChange",
    resolver: yupResolver(ApplicantArrayFormSchema),
    defaultValues: {
      applicants: [blankForm(shouldHaveAPrimary)]
    }
  });

  const onSubmit = (data: ApplicantArrayFormType) => {
    formMethods.reset();
    onSaveAll(data.applicants);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>New Applicant</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <ApplicantFormArray shouldHaveAPrimary={shouldHaveAPrimary} />
            </ModalBody>
            <ModalFooter>
              <HStack justifyContent={"end"} w="full">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => formMethods.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" variant="solid" colorScheme="blue">
                  Submit
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
}
