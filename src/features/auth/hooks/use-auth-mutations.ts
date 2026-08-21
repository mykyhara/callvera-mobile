import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn, signOut } from "../services/api";

interface SignInParams {
  email: string;
  password: string;
}

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: SignInParams) => {
      const { data, error } = await signIn(email, password);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
