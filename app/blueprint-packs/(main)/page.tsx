import Main from "../../../components/Main"
import Pagination from "../../../components/Pagination"
import BlueprintContainer from "../../../components/BlueprintContainer"
import { getPageCountAndBlueprintsByPage } from "../../../services/blueprint"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

import type { Blueprint } from "../../../drizzle/schema"

export default async function BlueprintPacksPage({ searchParams }: {
  searchParams: {
    page: string,
    category: string,
    sort: string
  } | undefined
}) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const category = searchParams?.category as Blueprint["categories"][number] | undefined
  const sort = searchParams?.sort

  // const { pageCount, blueprints } = await getPageCountAndBlueprintPacksByPage(page, category, sort)
  const { pageCount, blueprintPacks } = {
    pageCount: 1, // Placeholder value, replace with actual logic
    blueprintPacks: [
      // Placeholder value, replace with actual logic
      {
        id: 1,
        title: "Sample Blueprint",
        images: [
          "https://example.com/images/sample-blueprint.jpg"
        ],
        blueprints: [
          { id: 1, title: "Blueprint 1", images: ["https://example.com/images/blueprint1.jpg"] },
          { id: 2, title: "Blueprint 2", images: ["https://example.com/images/blueprint2.jpg"] }
        ],
        averageRating: 4.5,
        downloads: 1000,
      },
      {
        id: 2,
        title: "Another Blueprint",
        images: [
          "https://example.com/images/another-blueprint.jpg"
        ],
        blueprints: [
          { id: 1, title: "Blueprint 1", images: ["https://example.com/images/blueprint1.jpg"] },
          { id: 2, title: "Blueprint 2", images: ["https://example.com/images/blueprint2.jpg"] },
          { id: 3, title: "Blueprint 3", images: ["https://example.com/images/blueprint3.jpg"] }
        ],
        averageRating: 4.0,
        downloads: 500,
      }
    ] // Placeholder value, replace with actual logic
  }

  const { isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  return (
    <Main classname="flex flex-col items-stretch bg-dark-bg">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center p-4 bg-main-bg mb-2 lg:mb-4 text-sm sm:text-base">
        <p className="mr-4">Do you want to share your blueprint pack?</p>
        {
          authenticated ?
            <Link
              href="/create-blueprint-pack"
              className="px-2 py-1 bg-logo-blue text-sm lg:text-base text-black lg:hover:bg-light-bg  lg:hover:text-logo-blue lg:hover:font-semibold rounded-sm"
            >
              Create Blueprint Pack
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
      <BlueprintContainer entries={blueprintPacks} title="Blueprint Packs" filter={{ category, sort }} type="blueprintPack" />
      <Pagination
        path="/blueprint-packs"
        currentPage={page}
        pageCount={pageCount}
        filterPath={`${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}` : ""}`}
      />
    </Main>
  )
}