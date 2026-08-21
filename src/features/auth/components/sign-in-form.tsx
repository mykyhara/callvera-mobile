import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, type TextInput, View } from "react-native";

import { ErrorText } from "@/components/error-text";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { signInFormSchema, SignInFormValues } from "../schemas/sign-in-form";

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void;
  isLoading?: boolean;
  error?: string;
}

export const SignInForm = ({ onSubmit, isLoading, error }: SignInFormProps) => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const passwordInputRef = useRef<TextInput>(null);

  const onEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <SignInFormContainer
      title="Sign in to your app"
      description="Welcome back! Please sign in to continue"
    >
      <FormProvider {...form}>
        <View className="gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    submitBehavior="submit"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoComplete="password"
                    autoCapitalize="none"
                    secureTextEntry
                    onSubmitEditing={form.handleSubmit(onSubmit)}
                    returnKeyType="send"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <View className="gap-1.5">
            {!!error && <ErrorText>{error}</ErrorText>}
            <Button
              className="w-full opacity-100"
              onPress={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading && <ActivityIndicator />}
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </FormProvider>
    </SignInFormContainer>
  );
};

const SignInFormContainer = ({
  children,
  title,
  description,
}: PropsWithChildren<{ title: string; description: string }>) => (
  <View className="gap-6">
    <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left">
          {title}
        </CardTitle>
        <CardDescription className="text-center sm:text-left">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">{children}</CardContent>
    </Card>
  </View>
);
