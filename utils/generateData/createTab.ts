import { ITab } from "../../interfaces";
import getAdmin from "../auth/getAdmin";

export default async (tab: ITab) => {
    const db = getAdmin().firestore();
    const ref = db.collection("Tabs").doc(tab.name);
    const snap = await ref.get();
    if (snap.exists) {
        throw `a space with that ID already exists`;
    }
    await ref.set(tab)
}