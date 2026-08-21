import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { View, ViewProps } from "react-native";

import { cn } from "@/lib/utils";

import { ErrorText } from "../error-text";
import { Label } from "../ui/label";
import { Text } from "../ui/text";

type TextProps = React.ComponentProps<typeof Text>;

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined,
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<{ id: string } | undefined>(
  undefined,
);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>.");
  }

  const { name } = fieldContext;
  const { id } = itemContext ?? {};
  const formState = useFormState({ control: formContext.control, name });
  const fieldState = formContext.getFieldState(name, formState);

  return {
    id,
    name,
    formItemId: id ? `${id}-form-item` : undefined,
    formDescriptionId: id ? `${id}-form-item-description` : undefined,
    formMessageId: id ? `${id}-form-item-message` : undefined,
    ...fieldState,
  };
};

export function FormItem({ className, ...props }: ViewProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View
        data-slot="form-item"
        className={cn("gap-1.5", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error } = useFormField();

  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
}

export function FormControl({ className, children, ...props }: ViewProps) {
  const { formItemId } = useFormField();

  return (
    <View
      data-slot="form-control"
      nativeID={formItemId}
      className={className}
      {...props}
    >
      {children}
    </View>
  );
}

export function FormDescription({ className, ...props }: TextProps) {
  const { formDescriptionId } = useFormField();

  return (
    <Text
      variant="p"
      data-slot="form-description"
      nativeID={formDescriptionId}
      className={cn("text-on-surface-variant", className)}
      {...props}
    />
  );
}

type FormMessageProps = TextProps & {
  detached?: boolean;
  fieldPath?: string;
};

export function FormMessage({
  detached = false,
  fieldPath,
  ...props
}: FormMessageProps) {
  const { formMessageId, error } = useFormField();
  const formContext = useFormContext();

  const nestedError = React.useMemo(() => {
    if (!fieldPath) return undefined;

    return fieldPath.split(".").reduce<unknown>((acc, segment) => {
      if (acc == null) return undefined;

      const arrayIndexMatch = segment.match(/(.*)\[(\d+)\]$/);
      if (arrayIndexMatch) {
        const [, baseKey, indexString] = arrayIndexMatch;
        const index = Number(indexString);
        const next = (acc as Record<string, unknown>)[baseKey];
        return Array.isArray(next) ? next[index] : undefined;
      }

      if (typeof acc !== "object") {
        return undefined;
      }

      return (acc as Record<string, unknown>)[segment];
    }, formContext.formState.errors as unknown);
  }, [fieldPath, formContext.formState.errors]);

  const errorToShow = fieldPath ? nestedError : error;
  const errorMessage = extractErrorMessage(errorToShow);

  if (!detached && !errorToShow) {
    return null;
  }

  const body = detached ? props.children : errorMessage;

  if (!body) {
    return null;
  }

  return (
    <ErrorText data-slot="form-message" nativeID={formMessageId} {...props}>
      {body}
    </ErrorText>
  );
}

export function FormContainer({ className, children, ...props }: ViewProps) {
  return (
    <View
      data-slot="form-container"
      className={cn("gap-4", className)}
      {...props}
    >
      {children}
    </View>
  );
}

const extractErrorMessage = (errorToShow: unknown): string => {
  if (!errorToShow) {
    return "";
  }

  if (Array.isArray(errorToShow) && errorToShow.length > 0) {
    const messages = new Set<string>();
    for (const value of errorToShow) {
      const nested = extractErrorMessage(value);
      if (nested) {
        messages.add(nested);
      }
    }

    return Array.from(messages).join(", ");
  }

  if (
    typeof errorToShow === "object" &&
    "message" in (errorToShow as Record<string, unknown>)
  ) {
    const message = (errorToShow as { message?: unknown }).message;
    return typeof message === "string" ? message : String(message ?? "");
  }

  return "";
};
