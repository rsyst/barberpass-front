import { Grid } from '@chakra-ui/react'
import RstHeader from '@shared/components/Header'
import RstInfoCard from '@shared/components/InfoCard'
import RstMeetCard from '@shared/components/MeetCard'
import RstText from '@shared/components/Text'
import React from 'react'

const Appointments = [
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '11:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  }
]

const Dashboard = () => {
  return (
    <>
      <RstHeader />
      <Grid p={4} gap={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={3} overflowX="scroll">
          <RstInfoCard
            title="Faturamento do dia"
            value="$120,80"
            badge={{ colorScheme: 'green', children: '+5,6% maior (ultima semana)' }}
          />
          <RstInfoCard title="Atendimentos" value="23" badge={{ colorScheme: 'red', children: '-3 essa semana' }} />
          <RstInfoCard title="Clientes" value="63" badge={{ colorScheme: 'green', children: '2 novos cliente' }} />
        </Grid>

        <RstText fontVariant="h5" color="gray.1200" mt={4}>
          Atendimentos seguintes
        </RstText>

        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={3} overflowX="scroll">
          {Appointments.map((appointment, index) => (
            <RstMeetCard key={index} {...appointment} />
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
