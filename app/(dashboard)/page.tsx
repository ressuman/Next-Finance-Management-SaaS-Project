import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <UserButton />
      <Button variant={"destructive"}>Click me</Button>
      <p>This is an authenticated route</p>
    </>
  );
}
