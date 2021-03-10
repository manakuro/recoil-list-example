import React from 'react'
import { useListItem } from './hooks/useList'

type Props = {
  id: string
}

export const Counter: React.VFC<Props> = (props) => {
  const { listItem, upsertListItem } = useListItem(props.id)

  function handleChange(diff: number) {
    upsertListItem({ ...listItem, count: listItem.count + diff })
  }

  return (
    <div>
      <button type="button" onClick={() => handleChange(1)}>
        Increase
      </button>
      <button type="button" onClick={() => handleChange(-1)}>
        Decrease
      </button>

      {listItem.count}
    </div>
  )
}
