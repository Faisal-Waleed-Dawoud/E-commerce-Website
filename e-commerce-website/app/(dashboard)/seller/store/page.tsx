import CreateStore from "@/components/seller/store/createStore";
import { getUser, getUserStore } from "@/lib/db/database";
import ImageKit from "imagekit";
import { Store, User } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import StoreCard from "@/components/seller/store/storeCard";
import { authUserId } from "@/lib/utils";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
});

export const metadata: Metadata = {
  title: "Store",
};

async function Page() {
  const userId = await authUserId();

  if (!userId) {
    return notFound();
  }

  const user = (await getUser(userId)) as User;

  let store: Store;
  let storeLogo;
  let storeBanner;

  store = await getUserStore(user.id);
  if (store) {
    storeLogo = await imageKit.getFileDetails(store.logo);
  }

  return (
    <>
      <h1>Store</h1>
      <div>
        {!store ? (
          <div>
            <h3>It seems you do not have a store</h3>
            <CreateStore sellerId={user.id} />
          </div>
        ) : (
          <StoreCard
            storeLogo={storeLogo.url}
            storeName={store.name}
            mainBtnLink={`/seller/store/${store.id}`}
            mainBtnTitle={"Go to Store"}
            controlBtnLink={`/stores/${store.id}`}
            controlBtnTitle={"Preview The Store"}
          />
        )}
      </div>
    </>
  );
}

export default Page;
