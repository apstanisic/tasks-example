import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { CommonInputProps } from './FormPropsType';

type CheckboxInputProps<T extends FieldValues = FieldValues> = CommonInputProps<
  { label: string },
  T
>;

export function CheckboxInput<T extends FieldValues>(
  props: CheckboxInputProps<T>
) {
  const { control, label, name } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            name={name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
            ref={field.ref}
            checked={field.value}
          />
        }
      />
      {error && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormGroup>
  );
}
