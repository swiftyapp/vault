import { nanoid } from 'nanoid'

export interface BoxProps {
  id: string
  type: string
  title: string
  createdAt?: number
  updatedAt?: number
  website?: string
  username?: string
  password?: string
  email?: string
  node?: string
  otp?: string
  number?: string
  name?: string
  year?: string
  month?: string
  cvc?: string
  pin?: string
}

export interface BoxInterface extends BoxProps {
  serialize: () => BoxProps | object
}

export interface BoxRequiredProps {
  type: string
  title: string
}

export class Box implements BoxInterface {
  id: string
  type: string
  title: string
  createdAt: number
  updatedAt: number
  propsKeys: string[]

  constructor(props: BoxProps) {
    this.propsKeys = Object.keys(props)
    this.propsKeys.forEach((key) => (this[key] = props[key]))
  }

  static initialize({ type, title, ...rest }: BoxRequiredProps) {
    const id = nanoid()
    const createdAt = new Date().getTime()
    const updatedAt = createdAt
    return new Box({ id, createdAt, updatedAt, type, title, ...rest })
  }

  static load(props: BoxProps) {
    return new Box(props)
  }

  serialize() {
    return this.propsKeys.reduce((acc, key) => {
      acc[key] = this[key]
      return acc
    }, {})
  }
}
