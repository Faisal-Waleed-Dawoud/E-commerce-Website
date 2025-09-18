import { getStore } from "@/lib/db/database";
import { notFound } from "next/navigation";
import React from "react";

async function Page({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;

  const store = await getStore(storeId);

  if (!store) return notFound();

  return <></>;
}

export default Page;
