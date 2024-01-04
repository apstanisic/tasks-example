import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FieldValues, useController } from 'react-hook-form';
import { CommonInputProps } from './FormPropsType';

type DateTimeInputProps<T extends FieldValues = FieldValues> = CommonInputProps<
  { label: string; required?: boolean },
  T
>;

export function DateTimeInput<T extends FieldValues>(
  props: DateTimeInputProps<T>
) {
  const { control, label, name, required } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="w-full flex flex-col">
      <DateTimePicker
        label={label}
        name={name}
        onChange={field.onChange}
        disabled={field.disabled}
        ref={field.ref}
        value={field.value ? dayjs(field.value) : null}
        ampm={false}
        slotProps={{
          field: { clearable: true },
          textField: {
            onBlur: field.onBlur,
            required,
            helperText: error?.message,
            error: !!error,
          },
        }}
      />
    </div>
  );
}
