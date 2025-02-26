import FHIR from "fhirclient";

export const launchFHIRApp = () => {
  if (typeof window !== "undefined") {
    FHIR.oauth2.authorize({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope:
        "launch openid fhirUser profile patient/*.read practitioner/*.read",
      redirect_uri: `${window.location.origin}/callback`,
      iss: process.env.NEXT_PUBLIC_FHIR_ISSUER,
    });
  }
};

export const getFHIRClient = async () => {
  return await FHIR.oauth2.ready();
};
