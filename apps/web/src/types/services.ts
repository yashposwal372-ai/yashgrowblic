export type ServiceItem = {
  name: string;
};

export type ServiceCategory = {
  description: string;
  id: string;
  title: string;
  items: ServiceItem[];
};
