import React from 'react'
import { useListItem } from './hooks/useList'

type Props = {
  id: string
}

export const Description: React.VFC<Props> = (props) => {
  const { listItem } = useListItem(props.id)

  return <p>description: {listItem.count}</p>
}
