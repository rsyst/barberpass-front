export interface iClient {
  id: string
  name: string
  phone_number: string
  created_at: string
  updated_at: string
}
export interface iCompany {
  id: string
  name: string
  company_name: string
  email: string
  password: string
  document: string
  phone_number: string
  created_at: string
  updated_at: string
}
export interface iEmploye {
  id: string
  company_id: string
  start_time: string
  end_time: string
  time_per_work: string
  email: string
  password: string
  name: string
  created_at: string
  updated_at: string
}
export interface iMeet {
  id: string
  client_id: string
  start_meet: string
  end_meet: string
  title: string
  created_at: string
  updated_at: string
}
