import { LayoutUser } from '@shared/components/LayoutUser'
import { BarberDashboard } from '@shared/pages'
import Head from 'next/head'

const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutUser>
        <BarberDashboard />
      </LayoutUser>
    </>
  )
}

export default Page
