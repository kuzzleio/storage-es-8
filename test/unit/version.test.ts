import { describe, expect, it } from "vitest";

import { isSupportedElasticsearch } from "../../lib/version";

describe("isSupportedElasticsearch", () => {
  it.each(["8.0.0", "8.1.2", "8.99.0", "8.0.0-SNAPSHOT"])(
    "accepts Elasticsearch %s",
    (number) => {
      expect(isSupportedElasticsearch({ number })).toBe(true);
    },
  );

  it.each(["7.17.0", "9.0.0", "9.1.0"])(
    "refuses Elasticsearch %s",
    (number) => {
      expect(isSupportedElasticsearch({ number })).toBe(false);
    },
  );

  it("refuses OpenSearch, whatever version it reports", () => {
    expect(
      isSupportedElasticsearch({
        distribution: "opensearch",
        number: "8.10.2",
      }),
    ).toBe(false);
  });

  it("refuses an unreadable version", () => {
    expect(isSupportedElasticsearch({ number: "unknown" })).toBe(false);
  });
});
