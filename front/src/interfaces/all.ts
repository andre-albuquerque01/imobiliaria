export interface HouseInterface {
  idHouse: string
  title: string
  description: string
  address: string
  value: number
  rooms: number
  image: {
    image: string
  }[]
  user: {
    idUser: string
    name: string
    contact: string
  }
}

export interface UserInterface {
  idUser: string
  name: string
  email: string
  contact: string
}
