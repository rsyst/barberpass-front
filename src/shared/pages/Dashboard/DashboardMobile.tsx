import { Collapse, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import RstAccordion from 'shared/components/Accordion'
import DashboardCalendar from './DashboardCalendar'
import DashboardCalendarToday from './DashboardCalendarToday'

const DashboardMobile = () => {
  const { isOpen: isOpenToday, onToggle: onToggleToday } = useDisclosure()
  const { isOpen: isOpenCalendar, onToggle: onToggleCalendar } = useDisclosure()

  useEffect(() => {
    onToggleToday()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid p={3} gap={2} w="100%">
      <RstAccordion title="Próximos horários de hoje" onToggle={onToggleToday} isOpen={isOpenToday} />

      <Collapse in={!!isOpenToday}>
        <GridItem p={1} bg="white" borderRadius={16} maxH="60vh" overflow="auto">
          <DashboardCalendarToday />
        </GridItem>
      </Collapse>

      <RstAccordion title="Todos os horários" onToggle={onToggleCalendar} isOpen={isOpenCalendar} />

      <Collapse in={!!isOpenCalendar}>
        <GridItem p={1} bg="white" borderRadius={16} maxH="60vh" overflow="auto">
          <DashboardCalendar />
        </GridItem>
      </Collapse>
    </Grid>
  )
}

export default DashboardMobile
