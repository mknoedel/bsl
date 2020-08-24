// TODO: Get rid of this page, it is completely useless.

import React from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import Link from "next/link"
import initFirebase from "../utils/auth/initFirebase"
import usePagination from "firestore-pagination-hook" //TODO: Use useSWR instead of this hook
import { useUser } from "../utils/auth/userUser"
import Layout from "../components/Layout"

initFirebase();

const Spaces = () => {
  const { user } = useUser()
  const db = firebase.firestore()
  const {
    loadingMore,
    // loadingError,
    // loadingMoreError,
    loading,
    hasMore,
    items,
    loadMore
  } = usePagination(
    db.collection("Spaces")
      .where("uid", "==", user?.id || "")
      .orderBy("spaceId", "asc"),
    { limit: 10 }
  )
  
  return (
    <Layout title={'Spaces'}>
      {!user?.id ? (
        <></>
      ) : (
        <>
          <label>spaces</label>{" "}
          <Link href={"/spaces/create"}>
            <a>[ create ]</a>
          </Link>
          <div>
            {loading && <div>...</div>}
            {items.map((item: any, idx: number) => (
              <pre className="text-xs" key={idx}>{JSON.stringify(item.data() || {}, null, 2)}</pre>
            ))}
            {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
          </div>
        </>
      )}
    </Layout>
  )
}

export default Spaces
