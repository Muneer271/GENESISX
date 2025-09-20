import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <p className="text-muted-foreground">Manage your account and settings.</p>
      <Card className="mt-8">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
            <User className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Coming Soon!</h2>
            <p className="text-muted-foreground mt-2">Your profile page is under construction. Soon you'll be able to <br/> manage your settings, alerts, and more.</p>
        </CardContent>
      </Card>
    </div>
  );
}
