import configPromise from "@/payload-config";
import { RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

export default function Page(props: any) {
  return <RootPage config={configPromise} importMap={importMap} params={props.params} searchParams={props.searchParams} />;
}
