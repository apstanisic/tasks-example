import { Control, FieldValues, Path } from "react-hook-form";

/**
 * Every form component should accepts same props as their base component,
 * only that it requires `control`, and `name` that exists in `useForm`.
 * This type reduces duplication of declaring types for every form component.
 *
 * @example
 * ```ts
 * type FormInputProps<T extends FieldValues = FieldValues> = CommonInputProps<InputProps, T>;
 * ```
 */
export type CommonInputProps<
  TProps,
  TValues extends FieldValues = FieldValues
> = Omit<TProps, "name"> & {
  control: Control<TValues>;
  name: Path<TValues>;
};
