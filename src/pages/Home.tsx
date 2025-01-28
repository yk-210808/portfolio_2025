import { Mv } from "@features/home"
import { Header } from "@features/common"
import ProviderTree from "@features/home/providers/ProviderTree"


const Home = () => {

  return (
    <>
      <Header />
      <ProviderTree>
        <Mv />
      </ProviderTree>
    </>
  )
}

export default Home