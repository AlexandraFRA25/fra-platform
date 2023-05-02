import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource, dataSourceType } from '@meta/assessment'
import { DataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const TextInput: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('type', event.target.value)
  return (
    <DataColumn className={classNames('data-source-column')}>
      <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSourceValue.type} />
    </DataColumn>
  )
}

const SelectInput: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props

  const { t } = useTranslation()
  const _onChange = ({ value }: { value: string }) => onChange('type', value)

  const items = useMemo(() => {
    return Object.keys(dataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
  }, [t])

  return (
    <Autocomplete
      readOnlyOptions
      disabled={disabled}
      onSave={_onChange}
      value={dataSourceValue.type ? t(`dataSource.${dataSourceValue.type}`) : ''}
      items={items}
    />
  )
}

const ColumnTypeOfDataSource: React.FC<Props & { dataSourceMetadata: DataSourceDescription }> = (
  props: Props & { dataSourceMetadata: DataSourceDescription }
) => {
  const { dataSourceMetadata } = props
  const { typeOfDataSourceText } = dataSourceMetadata?.table || {}

  return (
    <DataColumn className="data-source-column">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {typeOfDataSourceText ? <TextInput {...props} /> : <SelectInput {...props} />}
    </DataColumn>
  )
}

export default ColumnTypeOfDataSource