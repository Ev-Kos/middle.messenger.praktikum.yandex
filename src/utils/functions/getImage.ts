import { resurceApi } from "../constants"

export const getImage = (path: string): string => {
  return resurceApi+path
}
