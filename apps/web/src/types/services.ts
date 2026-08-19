export type ServiceItem = {
  name: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  items: ServiceItem[];
};
