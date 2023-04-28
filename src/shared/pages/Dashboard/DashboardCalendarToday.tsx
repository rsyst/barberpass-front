import { Grid, Skeleton } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import RstMeetCard from 'shared/components/MeetCard/MeetCard'
import { useUserContext } from 'shared/providers/user'
import { useQueryMeetsControllerShow } from 'shared/service/MeetsController'

const DashboardCalendarToday = () => {
  const { user } = useUserContext()

  const { data = [], isLoading } = useQueryMeetsControllerShow({
    employe: user?.id,
    date: moment().format('YYYY-MM-DD')
  })

  if (isLoading) {
    return (
      <Grid gap={4} overflow="auto" p={3}>
        <Skeleton h={93} borderRadius={16} />
        <Skeleton h={93} borderRadius={16} />
        <Skeleton h={93} borderRadius={16} />
      </Grid>
    )
  }

  return (
    <>
      <Grid gap={4} overflow="auto" p={3}>
        {data?.length ? data.map((item) => <RstMeetCard key={item.id} item={item} />) : <p>Nenhum horário para hoje</p>}
      </Grid>
    </>
  )
}

export default DashboardCalendarToday
