import { v4 as uuidv4 } from "uuid";

export type Applicant = {
  id: string;
  isPrimary: boolean;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
};

export type ApplicantReducerAction =
  | {
      type: "REMOVE" | "SET_AS_PRIMARY";
      id: string;
    }
  | {
      type: "ADD";
      applicant: Omit<Applicant, "id" | "isPrimary">;
    }
  | {
      type: "ADD_ALL";
      applicants: Omit<Applicant, "id">[];
    };

export const applicantReducer = (
  state: Applicant[],
  action: ApplicantReducerAction
) => {
  switch (action.type) {
    case "REMOVE": {
      const toRemove = state.find((applicant) => applicant.id === action.id);
      const newState = state.filter((applicant) => applicant.id !== action.id);
      if (toRemove?.isPrimary && newState.length > 0) {
        return [
          {
            ...newState[0],
            isPrimary: true
          },
          ...newState.slice(1)
        ];
      }
      return newState;
    }
    case "ADD": {
      return [
        ...state,
        {
          ...action.applicant,
          id: uuidv4(),
          isPrimary: state.length == 0 // Make it primary if it's the only one
        }
      ];
    }
    case "ADD_ALL": {
      const hasNewPrimary = action.applicants.find(
        (applicant) => applicant.isPrimary
      );
      return [
        ...(hasNewPrimary
          ? state.map((s) => ({ ...s, isPrimary: false }))
          : state),
        ...action.applicants.map((applicant) => ({
          ...applicant,
          id: uuidv4()
        }))
      ];
    }
    case "SET_AS_PRIMARY": {
      return state.map((applicant) => {
        return {
          ...applicant,
          isPrimary: applicant.id === action.id
        };
      });
    }
  }
};

export const blankForm = (primary?: boolean) => {
  return {
    lastName: "",
    firstName: "",
    mobileNumber: "",
    email: "",
    isPrimary: primary ?? false
  };
};
