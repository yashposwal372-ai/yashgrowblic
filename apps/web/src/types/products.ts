export type ProductInterfaceType =
  | "ai-desk"
  | "flow"
  | "learn"
  | "commerce"
  | "secure";

export interface ProductConcept {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  interfaceType: ProductInterfaceType;
}
