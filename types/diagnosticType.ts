type DiagnosticReportType = {
  resourceType: "DiagnosticReport";
  id: string;
  meta: {
    profile: string[];
  };
  status: "preliminary" | "final" | "amended" | "cancelled"; // Adjust based on possible values
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  }>;
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  subject: {
    reference: string;
  };
  encounter: {
    reference: string;
  };
  effectiveDateTime: string; // ISO 8601 date-time string
  issued: string; // ISO 8601 date-time string
  performer: Array<{
    reference: string;
    display: string;
  }>;
  presentedForm: Array<{
    contentType: string;
    data: string; // Base64 encoded data
  }>;
};

type DiagnosticReportRequest = {
  method: "POST";
  url: "DiagnosticReport";
};

export interface DiagnosticReportData {
  fullUrl: string;
  resource: DiagnosticReportType;
  request: DiagnosticReportRequest;
}
