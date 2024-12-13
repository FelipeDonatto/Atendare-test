export interface ContactResponse {
  success: boolean;
  data: ContactData;
}

export interface ContactData {
  emails: string[];
  phones: string[];
  site: string;
  origin: number;
  birth_date: string;
  customer_date: string;
  life_cycle: number;
  gender: number;
  lead_scoring: number;
  source_id: number;
  source: Entity;
  jobtitle_id: number;
  jobtitle: Entity;
  parent_id: number;
  parent: PersonDetails;
  responsible_id: number;
  responsible: PersonDetails;
  author_id: number;
  author: AuthorDetails;
  creation_date: string;
  update_date: string;
  addresses: Address[];
  groups: Group[];
  tags: Tag[];
  companies: Company[];
  company_id: number;
  company: Company;
  id: number;
  name: string;
  full_name: string;
  email: string;
  phone: string;
  document: string;
  image: string;
  image_min: string;
  show_name: string;
  custom_exemple: string;
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
