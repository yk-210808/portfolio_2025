import { Header, Layout } from "@features/common"

const Profile = () => {
  return (
    <>
      <Header />
      <Layout title="Profile">
        <table className="mt-10">
          <tbody>
            <tr>
              <th className="font-normal p-3">Name</th>
              <td className="font-normal p-3">Y</td>
            </tr>
            <tr>
              <th className="font-normal p-3">Date of Birth</th>
              <td className="font-normal p-3">1998-12-08</td>
            </tr>
            <tr>
              <th className="font-normal p-3">Address</th>
              <td className="font-normal p-3">Chiba, Japan</td>
            </tr>
            <tr>
              <th className="font-normal p-3">Contact</th>
              <td className="font-normal p-3"><a href="mailto:y.koba.eng88@gmail.com" className="underline hover:no-underline">y.koba.eng88@gmail.com</a> または <a href="https://x.com/0o__snow" target="_blank" className="underline hover:no-underline">DM</a>でご連絡ください</td>
            </tr>
          </tbody>
        </table>
      </Layout>
    </>
  )
}

export default Profile