import { Tabs } from "expo-router";
import {
  CircleUserIcon,
  LayoutDashboardIcon,
  PhoneCallIcon,
  UsersIcon,
} from "lucide-react-native";

import { Icon } from "@/components/ui/icon";
import { ALLOW_FONT_SCALING } from "@/constants/text";

const TABS = [
  {
    name: "index",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "calls",
    title: "Calls",
    icon: PhoneCallIcon,
  },
  {
    name: "leads",
    title: "Leads",
    icon: UsersIcon,
  },
  {
    name: "profile",
    title: "Profile",
    icon: CircleUserIcon,
  },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            title: tab.title,
            tabBarAllowFontScaling: ALLOW_FONT_SCALING,
            tabBarIcon: ({ color }) => <Icon as={tab.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
