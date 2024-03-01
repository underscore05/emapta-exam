"use client";
import {
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
          <Heading fontSize={"xl"}>Applicants</Heading>
          {isOpen && (
            <ApplicantForm
              isOpen={isOpen}
              onClose={onClose}
              onSaveAll={(newApplicants) => {
                dispatch({ type: "ADD_ALL", applicants: newApplicants });
                onClose();
                toast({
                  title: `${newApplicants.length} applicant(s) has been added.`,
                  status: "success",
                  duration: 5000,
                  isClosable: true
                });
              }}
              shouldHaveAPrimary={applicants.length == 0}
            />
          )}
          <Flex w={"full"} justifyContent="end">
            <Button onClick={onOpen} colorScheme="green">
              Add Applicant
            </Button>
          </Flex>
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
        </Stack>
      </Container>
    </ChakraProvider>
  );
}
