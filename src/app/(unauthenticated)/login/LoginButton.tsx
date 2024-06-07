"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircleIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="ghost" disabled={pending}>
      {pending ? (
        <LoaderCircleIcon className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <FontAwesomeIcon icon={faSpotify} className="h-5 w-5 mr-2" />
      )}
      Sign In with Spotify
    </Button>
  );
}
