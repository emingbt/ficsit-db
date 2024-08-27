import NonAuthHomePage from './nonAuthHomePage'
import AuthHomePage from './authHomePage'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getPropertiesFromAccessToken } from '../utils/kinde'

export default async function HomePage() {
  const { getAccessToken } = getKindeServerSession()
  const accessToken = await getAccessToken()
  const pioneer = getPropertiesFromAccessToken(accessToken)

  if (pioneer) {
    return (
      <AuthHomePage pioneer={pioneer} />
    )
  } else {
    return (
      <NonAuthHomePage />
    )
  }
}