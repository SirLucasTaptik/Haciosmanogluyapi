import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { projectId, dataset, apiVersion } from "./lib/sanity/client";

export default defineConfig({
  name: "haciosmanoglu-yapi",
  title: "Hacıosmanoğlu Yapı — İçerik Yönetimi",
  projectId: projectId!,
  dataset,
  basePath: "/studio",
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets an admin run raw GROQ queries from the Studio — handy for
    // debugging, safe to keep in production since it requires Studio login.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
