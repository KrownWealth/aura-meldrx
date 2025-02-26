export interface FHIRBundle<T> {
  resourceType: "Bundle";
  type: string;
  entry?: { resource: T }[];
}
