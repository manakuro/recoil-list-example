import React, { useCallback } from 'react'
import { useListItem } from './hooks/useList'

type Props = {
  id: string
}

export const Counter: React.VFC<Props> = (props) => {
  const { listItem, upsertListItem } = useListItem(props.id)

  const handleChange = useCallback(
    (diff: number) => {
      upsertListItem({ ...listItem, count: listItem.count + diff })
    },
    [listItem, upsertListItem],
  )

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
