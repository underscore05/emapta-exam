import { Checkbox, CheckboxProps, forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

type CheckboxCustomProps = CheckboxProps & {
  control: any;
  name: string;
  children?: ReactNode;
  onToggle?: (checked: boolean) => void;
};

export const CheckboxCustom = forwardRef<CheckboxCustomProps, "input">(
  ({ children, onToggle, ...rest }, ref) => {
    return (
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field: { value, name, onChange } }) => {
          return (
            <Checkbox
              ref={ref}
              isChecked={value}
              {...rest}
              onChange={(e) => {
                onChange(e);
                if (onToggle) onToggle(e.target.checked);
              }}
            >
              {children}
            </Checkbox>
          );
        }}
      />
    );
  }
);
