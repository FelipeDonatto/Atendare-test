import { FormAddress } from "./Form";

export interface ContactResponse {
  success: boolean;
  data: ContactData;
}
export interface Contact {
  author: {
    id: number;
    detail: string;
    type: number;
    user_id: number;
    user_uid: number;
  };
  company_id: number | null;
  jobtitle_id: number | null;
  lead_scoring: number;
  gender: number;
  birth_date: string | null;
  emails: string[];
  phones: string[];
  site: string | null;
  url: string | null;
  source_id: number | null;
  parent_id: number | null;
  responsible_id: number | null;
  author_id: number;
  life_cycle: number;
  origin: number;
  customer_date: string | null;
  creation_date: string;
  update_date: string;
  id: number;
  address: FormAddress | null;
  addresses: object[] | null;
  groups: object[] | null;
  tags: object[] | null;
  name: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  image: string;
  image_min: string;
  show_name: string;
}

export interface ContactData extends Contact {
  total: number;
  page_index: number;
  page_size: number;
  results: Contact[];
}

export interface Entity {
  id: number;
  name: string;
}

export interface PersonDetails {
  id: number;
  name: string;
  full_name: string;
  email: string;
  phone: string;
  document: string;
  image: string;
  image_min: string;
  show_name: string;
}

export interface AuthorDetails {
  id: number;
  detail: string;
  type: number;
  user_id: number;
  automation_id: number;
  form_id: number;
  import_id: number;
  user_uid: number;
}

export interface Address {
  id: number;
  person_id: number;
  account_id: number;
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  complement: string;
  neighborhood: string;
  static_map: string;
  is_main: boolean;
  type: number;
  latitude: number;
  longitude: number;
  place_id: string;
  full_address: string;
  url_address: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Company {
  id: number;
  name: string;
  full_name: string;
  email: string;
  phone: string;
  document: string;
  image: string;
  image_min: string;
  show_name: string;
}
