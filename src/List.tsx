import React, { useEffect } from 'react'
import { Counter } from './Counter'
import { Description } from './Description'
import { ListItem, useList } from './hooks/useList'

const fetchList = (): Promise<ListItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          count: 10,
        },
        {
          id: '2',
          count: 20,
        },
      ])
    }, 1000)
  })
}

const List: React.VFC = () => {
  const { listIds, setList } = useList()

  useEffect(() => {
    ;(async () => {
      const list = await fetchList()
      setList(list)
    })()
  }, [setList])

  return (
    <ul>
      {listIds.map((id) => (
        <React.Fragment key={id}>
          <Counter id={id} />
          <Description id={id} />
        </React.Fragment>
      ))}
    </ul>
  )
}

export default List
