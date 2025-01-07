import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <>
      <SignedIn>
        <Redirect href="/(tabs)" />
        <Text>Signed in?</Text>
      </SignedIn>
      <SignedOut>
        <Redirect href="/sign-in" />
      </SignedOut>
    </>
  );
}
