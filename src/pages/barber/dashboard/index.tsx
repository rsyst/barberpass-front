import { LayoutUser } from '@shared/components/LayoutUser'
import BarberDashboard from '@shared/pages/Barber/Dashboard'
import Head from 'next/head'

const Page = () => {
  return (
    <>
      <Head>
        <title>Demetria - Fermentation</title>
      </Head>
      <LayoutUser>
        <BarberDashboard />
      </LayoutUser>
    </>
  )
}

export default Page
