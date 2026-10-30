# kuzzle-storage-es-8

The Elasticsearch 8 storage driver for [Kuzzle](https://github.com/kuzzleio/kuzzle) 2.

This is the driver Kuzzle 2 runs when `services.storageEngine.majorVersion` is `8`, moved as it is out of Kuzzle's core
([ADR-0003](https://github.com/kuzzleio/kuzzle/blob/2-dev/docs/adr-003/ADR-0003-storage-drivers.md), step 06). Kuzzle 2
depends on it at a pinned version: an Elasticsearch 8 stack has nothing to install nor to configure.

## Use it as an external driver

To select it explicitly, set `driver` in your `.kuzzlerc`:

```jsonc
{
  "services": {
    "storageEngine": {
      "driver": "kuzzle-storage-es-8",
      "client": { "node": "http://localhost:9200" }
    }
  }
}
```

The rest of `services.storageEngine` works as with the built-in drivers; `majorVersion` is not read. Every node of a
cluster must run the same driver.

Requires Kuzzle 2.61 or later, and Elasticsearch 8.

## Capabilities

The driver declares every optional capability (`aggregations`, `mappingUpdates`, `stats`, `updateByQuery`): every
Kuzzle API action works.

## Development

```bash
docker run -d -p 9200:9200 -e discovery.type=single-node -e xpack.security.enabled=false elasticsearch:8.17.1
npm ci
npm test   # Kuzzle's conformance kit, against ELASTICSEARCH_NODE (default http://localhost:9200)
```

## License

[Apache-2.0](LICENSE.md)
