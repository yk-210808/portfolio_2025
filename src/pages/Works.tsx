import { useState } from "react"
// components
import { Header, Layout } from "@features/common"
import { WorksList, WorksTab } from "@features/works"

const Works = () => {
  const [current, setCurrent] = useState('All')

  return (
    <>
      <Header />
      <Layout title="Works">
        <WorksTab setCurrent={setCurrent} />
        <WorksList current={current} />
      </Layout>
    </>
  )
}

export default Works