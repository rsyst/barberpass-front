import { Flex, Grid, Input, Skeleton } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment'
import { useQueryMeetsControllerShow } from 'shared/service/MeetsController'
import { useUserContext } from 'shared/providers/user'
import RstMeetCard from 'shared/components/MeetCard'

const DashboardCalendar = () => {
  const [selectDate, setSelectDate] = React.useState(moment().format('YYYY-MM-DD'))
  const { user } = useUserContext()

  const { data = [], isLoading } = useQueryMeetsControllerShow({
    employe: user?.id,
    date: selectDate
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
      <Flex mb={4} p={3}>
        <Input type="date" value={selectDate} onChange={({ target }) => setSelectDate(target.value)} />
      </Flex>
      <Grid gap={4} overflow="auto" p={3}>
        {data?.length ? data.map((item) => <RstMeetCard key={item.id} item={item} />) : <p>Nenhum horário para hoje</p>}
      </Grid>
    </>
  )
}

export default DashboardCalendar
