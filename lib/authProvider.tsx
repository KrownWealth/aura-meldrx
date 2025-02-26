"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FHIR from "fhirclient";

const AuthProvider = () => {
  const router = useRouter();

  useEffect(() => {
    FHIR.oauth2
      .ready()
      .then(() => router.push("/"))
      .catch(() => router.push("/login"));
  }, [router]);

  return (<div className="flex items-center justify-center min-h-screen">Authenticating...</div>);
};

export default AuthProvider;
