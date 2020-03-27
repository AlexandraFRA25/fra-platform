import { useEffect } from 'react'
import * as R from 'ramda'

import { debounce } from '@webapp/utils/functionUtils'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import usePostRequest from '@webapp/components/hooks/usePostRequest'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useOnUpdate from '@webapp/components/hooks/useOnUpdate'

const ID = 'postDescriptionData'
const getUrl = (countryIso, section, name) => `/api/country/descriptions/${countryIso}/${section}/${name}`
const getData = name => R.pathOr(null, [name, 'content'])

export default (name, section, template) => {
  const countryIso = useCountryIso()
  const { data = template || null, setState, loading, dispatch: fetchData } = useGetRequest(
    getUrl(countryIso, section, name)
  )

  useEffect(fetchData, [section, countryIso])

  const { dispatch: postData } = usePostRequest(getUrl(countryIso, section, name), {
    content: getData(name)(data),
  })

  useOnUpdate(() => {
    debounce(postData, ID, 800)()
  }, [data])

  const onChange = content => {
    setState({ data: { [name]: { content } } })
  }

  return {
    value: getData(name)(data),
    onChange,
    loading,
  }
}
