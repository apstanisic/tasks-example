import { TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { CommonInputProps } from './FormPropsType';

type TextInputProps<T extends FieldValues = FieldValues> = CommonInputProps<
  { label: string; type?: ComponentProps<'input'>['type']; required?: boolean },
  T
>;

export function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
  const { control, label, name, type, required } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      name={name}
      required={required}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={field.disabled}
      ref={field.ref}
      value={field.value}
      label={label}
      error={!!error?.message}
      helperText={error?.message}
      type={type}
    />
  );
}
