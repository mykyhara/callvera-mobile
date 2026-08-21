import { KeyboardAvoidingView, View } from "react-native";

import { ScreenTemplate } from "@/components/screen-template";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { useSignIn } from "@/features/auth/hooks/use-auth-mutations";

export default function SignInScreen() {
  const { mutate: handleSignIn, isPending, error } = useSignIn();

  return (
    <ScreenTemplate
      contentContainerClassName="items-center justify-center"
      scrollable
      scrollViewProps={{
        keyboardShouldPersistTaps: "handled",
        keyboardDismissMode: "interactive",
      }}
    >
      <KeyboardAvoidingView behavior="padding" className="w-full max-w-sm">
        <View className="py-4">
          <SignInForm
            onSubmit={handleSignIn}
            isLoading={isPending}
            error={error?.message}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
}
