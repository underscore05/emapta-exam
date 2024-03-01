"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useReducer } from "react";

import { ApplicantForm } from "./components/ApplicantForm";
import ApplicantsTable from "./components/ApplicantsTable";
import { applicantReducer } from "./reducers";

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        size: "sm"
      }
    },
    Table: {
      defaultProps: {
        size: "sm"
      }
    },
    Input: {
      defaultProps: {
        size: "sm"
      }
    }
  }
});

export default function Home() {
  const [applicants, dispatch] = useReducer(applicantReducer, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  return (
    <ChakraProvider theme={theme}>
      <Container maxW={"6xl"} mt="8">
        <Stack gap={4}>
          <Flex w={"full"} justifyContent="space-between">
            <Heading fontSize={"xl"}>Applicants</Heading>
            {applicants.length > 0 && (
              <Button
                onClick={onOpen}
                colorScheme="green"
                leftIcon={<AddIcon fontSize="x-small" />}
              >
                Add Applicant
              </Button>
            )}
          </Flex>
          {isOpen && (
            <ApplicantForm
              isOpen={isOpen}
              onClose={onClose}
              onSaveAll={(newApplicants) => {
                dispatch({ type: "ADD_ALL", applicants: newApplicants });
                onClose();
                toast({
                  title: `${newApplicants.length} applicant${newApplicants.length > 1 ? "s" : ""} added.`,
                  status: "success",
                  duration: 5000,
                  isClosable: true
                });
              }}
              shouldHaveAPrimary={applicants.length == 0}
            />
          )}
          <ApplicantsTable
            applicants={applicants}
            onRemove={(id) => {
              dispatch({
                type: "REMOVE",
                id
              });
              toast({
                title: "Applicant deleted.",
                status: "error",
                duration: 5000,
                isClosable: true
              });
            }}
            onSetAsPrimary={(id) =>
              dispatch({
                type: "SET_AS_PRIMARY",
                id
              })
            }
          />
          {applicants.length === 0 && (
            <Box p={8}>
              <Heading fontSize={"3xl"} textAlign={"center"}>
                No Appplicants Available
              </Heading>
              <Flex mt={8} w={"full"} justifyContent="center">
                <Button
                  leftIcon={<AddIcon fontSize="x-small" />}
                  onClick={onOpen}
                  colorScheme="green"
                >
                  Add Applicant
                </Button>
              </Flex>
            </Box>
          )}
        </Stack>
      </Container>
    </ChakraProvider>
  );
}
