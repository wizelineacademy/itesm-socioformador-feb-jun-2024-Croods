export interface ServiceDetails {
  [key: string]: string
}
export interface Services {
  [key: string]: ServiceDetails
}
export interface ResultsTableProps {
  results: Results
}
export interface Service {
  Name: string
  Description: string
  Categories: ServiceCategories[]
}
export interface ServiceCategories {
  Name: string
  Value: string
}
export interface Results {
  results: [Service]
  categories: string[]
}
