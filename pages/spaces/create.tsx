import React, { useState, useEffect, ChangeEvent } from "react";
import firebase from "firebase/app";
import Link from "next/link";
import Router from "next/router";
import initFirebase from "../../utils/auth/initFirebase";
import { useUser } from "../../utils/auth/userUser";


initFirebase();

type Inputs = {
  spaceId: string;
  title: string;
};

const SpacesCreate = () => {
  const { user } = useUser()
  var firstInput: HTMLInputElement | null = null;

  const initial: Inputs = {
    spaceId: "",
    title: ""
  };

  const [inputs, setInputs] = useState(initial);

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      if (inputs.spaceId.length === 0) {
        throw `space ID can't be empty`;
      } else if (inputs.title.length === 0) {
        throw `title can't be empty`;
      }
      const match = inputs.spaceId.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      if (!match || match.length > 1) {
        throw `space ID can only contain letters, numbers and hyphens`;
      }
      const db = firebase.firestore();
      const ref = db.collection("Spaces").doc(inputs.spaceId);
      const snap = await ref.get();
      if (snap.exists) {
        throw `a space with that ID already exists`;
      }
      await ref.set({
        spaceId: inputs.spaceId,
        title: inputs.title,
        uid: user?.id
      });
      Router.push("/spaces");
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    firstInput?.focus()
  }, [])

  return (
    <>
      {!user?.id ? (
        <></>
      ) : (
        <div>
          <div>create a new space</div>
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="spaceId">space ID: </label>
              <input
                type="text"
                id="spaceId"
                name="spaceId"
                onChange={handleInputChange}
                value={inputs.spaceId}
                ref={r => (firstInput = r)}
              />
            </p>
            <p>
              <label htmlFor="title">title: </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
              />
            </p>
            <p>
              <button type="submit">[ create ]</button>
            </p>
          </form>
          <p>
            <Link href={"/spaces"}>
              <a>[ back to spaces ]</a>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default SpacesCreate
