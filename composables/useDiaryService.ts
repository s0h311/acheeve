import { DiaryData } from '~/types/types'

export default () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user.value) {
    return
  }

  const saveEntry = async (entry: DiaryData) => {
    const { data: savedEntry, error: insertError } = await supabase
      .from('diary_entry')
      .insert({
        ...entry,
      })
      .select()

    if (insertError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    } else {
      const { error: insertUserDiaryEntryError } = await supabase.from('user_diary_entry').insert({
        user_id: user.value?.id,
        entry_id: savedEntry[0].id,
      })

      if (insertUserDiaryEntryError) {
        await supabase.from('diary_entry').delete({
          id: savedEntry[0].id,
        })
        throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
      }
    }
  }

  const getEntries = async () => {
    const { data: entryIds, error: fetchEntryIdsError } = await supabase.from('user_diary_entry').select().eq('user_id', user.value?.id)
    let ids = entryIds?.map((o) => o.entry_id)

    const { data: entries, error: fetchEntriesError } = await supabase.from('diary_entry').select().in('id', ids)

    if (fetchEntriesError || fetchEntryIdsError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }

    return entries
  }

  const updateEntry = async (entryId: number, entry: DiaryData) => {
    const { error: updateEntryError } = await supabase
      .from('diary_entry')
      .update({
        ...entry,
      })
      .eq('id', entryId)

    if (updateEntryError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }
  }

  const deleteEntry = async (entryId: number, pictures: any) => {
    await supabase.from('diary_entry').delete().eq('id', entryId)
    await supabase.storage.from('diary_pictures').remove(pictures)
  }

  return { saveEntry, getEntries, updateEntry, deleteEntry }
}
