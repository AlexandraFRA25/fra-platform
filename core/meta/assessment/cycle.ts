export interface CycledPropsObject<Props = void> {
  props: {
    cycles: Array<string>
  } & Props
  uuid?: string
  id?: number
}

export interface Cycle {
  id: string
  name: string // 2020 or 2025
  uuid: string
}