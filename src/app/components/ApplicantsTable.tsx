import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { Applicant } from "../reducers";

export default function ApplicantsTable({
  applicants,
  onRemove,
  onSetAsPrimary,
  containerProps
}: {
  applicants: Applicant[];
  onRemove: (applicantId: string) => void;
  onSetAsPrimary: (applicantId: string) => void;
  containerProps?: TableContainerProps;
}) {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const [forDeletion, setForDeletion] = useState<string | null>(null);
  const allowDelete = applicants.length > 1;

  const handleDelete = () => {
    if (forDeletion) {
      onRemove(forDeletion);
      handleDeleteClose();
    }
  };
  const handleDeleteClose = () => {
    setForDeletion(null);
    onDeleteClose();
  };

  return (
    <Box>
      <TableContainer {...containerProps}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th w="80px">Primary</Th>
              <Th>Lastname</Th>
              <Th>Firstname</Th>
              <Th>Email</Th>
              <Th>Mobile No.</Th>
              <Th w="50px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {applicants.map((applicant) => {
              return (
                <Tr key={`applicant-${applicant.id}`}>
                  <Td>{applicant.isPrimary && <CheckIcon />}</Td>
                  <Td>{applicant.lastName}</Td>
                  <Td>{applicant.firstName}</Td>
                  <Td>{applicant.email}</Td>
                  <Td>{applicant.mobileNumber}</Td>
                  <Td>
                    <HStack>
                      <Button
                        leftIcon={<DeleteIcon fontSize="x-small" />}
                        onClick={() => {
                          onDeleteOpen();
                          setForDeletion(applicant.id);
                        }}
                        variant="solid"
                        colorScheme="red"
                        isDisabled={
                          (!allowDelete || applicant.isPrimary) &&
                          applicants.length > 1
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => onSetAsPrimary(applicant.id)}
                        variant="outline"
                        colorScheme="orange"
                        isDisabled={applicant.isPrimary}
                      >
                        Set as Primary
                      </Button>
                      {/* )} */}
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Applicant
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
