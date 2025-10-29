import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileHeader() {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary to-primary/60" />
      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar className="h-32 w-32 border-4 border-card">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
              <p className="text-muted-foreground">Product Designer</p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
