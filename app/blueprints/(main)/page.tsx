import Main from "../../../components/Main"
import Pagination from "../../../components/Pagination"
import BlueprintContainer from "../../../components/BlueprintContainer"
import { getPageCountAndBlueprintsByPage } from "../../../services/blueprint"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"

import type { Blueprint } from "../../../drizzle/schema"
import Link from "next/link"

export default async function BlueprintsPage({ searchParams }: {
  searchParams: {
    page: string,
    category: string,
    sort: string
  } | undefined
}) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const category = searchParams?.category as Blueprint["categories"][number] | undefined
  const sort = searchParams?.sort

  const { pageCount, blueprints } = await getPageCountAndBlueprintsByPage(page, category, sort)

  const { isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  return (
    <Main classname="flex flex-col items-stretch bg-dark-bg">
      <BlueprintContainer blueprints={blueprints} title="Blueprints" filter={{ category, sort }} />
      <Pagination
        path="/blueprints"
        currentPage={page}
        pageCount={pageCount}
        filterPath={`${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}` : ""}`}
      />
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center p-4 bg-main-bg mt-2 lg:mt-4">
        <p className="mr-4">Do you want to share your blueprint?</p>
        {
          authenticated ?
            <Link
              href="/create-blueprint"
              className="px-2 py-1 bg-logo-blue text-sm lg:text-base text-black lg:hover:bg-light-bg  lg:hover:text-logo-blue lg:hover:font-semibold rounded-sm"
            >
              Create Blueprint
            </Link>
            :
            <LoginLink
              postLoginRedirectURL='/api/auth'
              className="px-2 py-1 bg-logo-blue text-sm lg:text-base text-black lg:hover:bg-light-bg  lg:hover:text-logo-blue lg:hover:font-semibold rounded-sm"
            >
              Login to create a blueprint
            </LoginLink>
        }
      </div>
    </Main>
  )
}