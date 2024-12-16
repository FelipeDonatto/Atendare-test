export interface FormContact {
  name: string;
  full_name: string;
  document: string;
  email: string;
  phone: string;
  site: string;
  birth_date: string | null;
  customer_date: string | null;
  gender: number | undefined;
  life_cycle: number | undefined;
  source_id: number | undefined;
  jobtitle_id: number | undefined;
  parent_id: number | undefined;
  responsible_id: number | undefined;
  company_id: number | undefined;
  address: FormAddress | null;
  addresses: object[];
  groups: object[];
  tags: object[];
  emails: string[];
  phones: string[];
}

export interface FormAddress {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  street: string;
  number: number | undefined;
  complement: string;
  type: number | undefined;
  is_main: boolean;
}
