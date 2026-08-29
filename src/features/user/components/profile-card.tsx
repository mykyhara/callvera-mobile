import { MailIcon, UserIcon } from "lucide-react-native";

import { CardRow } from "@/components/card-row";
import { CardSeparator } from "@/components/card-separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";

export const ProfileCard = () => {
  const { userContext } = useAuth();

  if (!userContext) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>
          Basic information connected to your Callvera account.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-y-1 px-4">
        <CardRow icon={UserIcon} label="Name" content={userContext.name} />
        <CardSeparator />
        <CardRow icon={MailIcon} label="Email" content={userContext.email} />
        <CardSeparator />
        <CardRow
          icon={UserIcon}
          label="Role"
          content={<RoleBadge role={userContext.role} />}
        />
      </CardContent>
    </Card>
  );
};

const RoleBadge = ({ role }: { role: string | null }) => (
  <Badge variant="default">
    <Text className="font-bold">{role?.toUpperCase() ?? "NO ROLE"}</Text>
  </Badge>
);
