import {
  atom,
  useRecoilValue,
  atomFamily,
  selectorFamily,
  DefaultValue,
  useRecoilCallback,
} from 'recoil'

export type ListItem = {
  id: string
  count: number
}

const listIdsState = atom<string[]>({
  key: 'listIdsState',
  default: [],
})

const listItemState = atomFamily<ListItem, string>({
  key: 'listItemState',
  default: (id) => ({ id, count: 0 }),
})

export const listItemSelector = selectorFamily<ListItem, string>({
  key: 'listItemSelector',
  get: (id) => ({ get }) => get(listItemState(id)),
  set: (id) => ({ get, set, reset }, newVal) => {
    if (newVal instanceof DefaultValue) {
      reset(listItemState(id))
      return
    }

    set(listItemState(id), newVal)

    if (get(listIdsState).find((id) => id === newVal.id)) return

    set(listIdsState, (prev) => [...prev, newVal.id])
  },
})

export const useList = () => {
  const listIds = useRecoilValue(listIdsState)

  const setList = useRecoilCallback(
    ({ set }) => (list: ListItem[]) => {
      list.forEach((l) => {
        set(listItemSelector(l.id), l)
      })
    },
    [],
  )

  return {
    listIds,
    setList,
  }
}

export const useListItem = (id: string) => {
  const listItem = useRecoilValue(listItemSelector(id))

  const upsertListItem = useRecoilCallback(
    ({ set }) => (listItem: ListItem) => {
      set(listItemSelector(listItem.id), listItem)
    },
    [],
  )

  return {
    listItem,
    upsertListItem,
  }
}
