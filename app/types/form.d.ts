import React from 'react'
import {
  Control,
  NestedValue,
  SetValueConfig,
  FieldElement,
} from 'react-hook-form'

//* Inputs
type RegisterType = (ref: (FieldElement<T> & React.Ref) | null) => void
//({required: string; pattern: {value: RegExp; message: string}})
export interface IFormInput {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  register: RegisterType
  defaultValue?: string
  optional?: boolean
  errors?: Record<string, any>
}

export interface INumberInput {
  id: string
  name: string
  label: string
  defaultValue?: number
  register: React.Ref<T>
}

export type FormInputType = {
  id?: string
  name?: string
  label?: string
  register: (ref: FieldElement<T> & React.Ref) => RegisterType
  errors: DeepMap<T, FieldError>
}

//* Selects
export type SelectOptionsType = {id: number; label: string}
export type NestedOptionsType = NestedValue<SelectOptionsType[]> | undefined

export interface IFormSelect {
  options: SelectOptionsType[]
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  disabled?: boolean
  defaultValues?: NestedOptionsType
  defaultValue?: NestedOptionsType
}

export interface IDefaultSelect {
  id: string
  name: string
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  defaultValue?: SelectOptionsType
}

//*Buttons
export type SubmitButtonType = {
  value?: string
  errors?: boolean
  bgColor?: string
}

export type ConfirmButtonType = {
  children?: string
  errors?: boolean
  bgColor?: string
  onClickAction?: () => void
}

export type ActionButtonType = {
  children: string
  action: () => void
  tabIndex?: number
  bgColor?: string
}

export type CancelButtonType = {
  onClickAction: () => void
  onKeyDownAction?: () => void
}

export type CloseButtonType = {
  onClickAction: () => void
  focusRef?: React.Ref<T>
}

//* Menu
export interface IMenuItem {
  label: string
  index: number
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  isSelectedTab: boolean
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}

export interface IMenuTab {
  children: React.ReactNode
  isSelectedTab: boolean
  index: number
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}

export interface IMenuPanel {
  children: React.ReactNode
  index: number
  isSelectedTab: boolean
}
