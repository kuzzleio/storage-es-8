/* Kuzzle's conformance kit, against a real Elasticsearch 8
 * (ELASTICSEARCH_NODE, http://localhost:9200 by default). */

import { describeStorageDriverConformance } from "kuzzle";
import type { StorageCapability } from "kuzzle";
import { afterAll, beforeAll, describe, it } from "vitest";

import { ES8Driver } from "../lib";
import manifest from "../manifest.json";

describeStorageDriverConformance({
  Driver: ES8Driver,
  capabilities: manifest.capabilities as StorageCapability[],
  config: {
    client: { node: process.env.ELASTICSEARCH_NODE ?? "http://localhost:9200" },
  },
  test: { afterAll, beforeAll, describe, it },
});
