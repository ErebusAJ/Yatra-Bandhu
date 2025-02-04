import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>YatraBandhu</Text>
      <Link href="/get_started"> Get Started</Link>
    </View>
  );
}
