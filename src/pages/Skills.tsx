import { Header, Layout } from "@features/common"
import { SkillsList } from "@features/skills"

const Skills = () => {
  
  return (
    <>
      <Header />
      <Layout title="Skills">
        <SkillsList />
      </Layout>
    </>
  )
}

export default Skills