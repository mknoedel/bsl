// import "../css/main.css";
import React, { useEffect } from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import PropTypes from "prop-types"
import { get } from "lodash"
import Link from "next/link"
import Router from "next/router"
import withAuthUser from "../utils/pageWrappers/withAuthUser"
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo"
import initFirebase from "../utils/auth/initFirebase"
import usePagination from "firestore-pagination-hook"
import Header from "../components/FakeHeader"
import Footer from "../components/FakeFooter"

initFirebase();

const Spaces = (props: any) => {
  const { AuthUserInfo } = props;
  const authUser = get(AuthUserInfo, "AuthUser")

  useEffect(() => {
    if (!authUser) {
      Router.push("/")
    }
  });

  const db = firebase.firestore()
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore
  } = usePagination(
    db
      .collection("Spaces")
      .where("uid", "==", authUser?.id || "")
      .orderBy("spaceId", "asc"),
    {
      limit: 10
    }
  );

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <Header />
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
          <Footer />
        </>
      )}
    </>
  );
};

Spaces.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  })
};

Spaces.defaultProps = {
  AuthUserInfo: null
};

export default withAuthUser(withAuthUserInfo(Spaces))
