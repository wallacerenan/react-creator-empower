export type Component = {
  id: string;
  type: string;
  value?: string;
  children?: Component[];
  attributes?: Attributes;
  styles?: {
    [key: string]: unknown;
  };
};

export type Attributes = {
  [key: string]: unknown;
};
