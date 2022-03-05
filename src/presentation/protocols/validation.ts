export interface Validation {
  isValid (data: any): Error | boolean
}
