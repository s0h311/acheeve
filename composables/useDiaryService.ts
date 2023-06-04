import { DiaryData } from '~/types'

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

    const { data: entries, error: fetchEntriesError } = await supabase.from('diary_entry').select().in('entry_id', ids)

    if (fetchEntriesError || fetchEntryIdsError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }

    return entries
  }

  //TODO NUR ZUM TESTEN
  // const handleSubmit = async () => {
  //   const fileName = Math.floor(Math.random() * 4561321989891)
  //   const { data, error } = await supabase.storage
  //     .from('images')
  //     .upload(fileName, info.value.image)

  //   if (error) return errorMessage.value = 'image cannot be uploaded'

  //   const body = {
  //     ...info.value,
  //     city: info.value.city.toLowerCase(),
  //     features: info.value.features.split(', '),
  //     numberOfSeats: parseInt(info.value.seats),
  //     year: parseInt(info.value.year),
  //     price: parseInt(info.value.price),
  //     miles: parseInt(info.value.miles),
  //     name: `${info.value.make} ${info.value.model}`,
  //     listerId: user.value.id,
  //     image: data.path
  //   }

  return { saveEntry, getEntries }
}
