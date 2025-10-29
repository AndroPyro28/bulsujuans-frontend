import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Briefcase, Calendar } from "lucide-react";

export default function ProfileInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          I'm a passionate product designer with 5+ years of experience creating beautiful and functional digital
          experiences. I specialize in user-centered design, interaction design, and design systems.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Systen Role</p>
              <p className="font-medium text-foreground">Student</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="font-medium text-foreground">January 2024</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
