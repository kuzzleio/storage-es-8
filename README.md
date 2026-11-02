# kuzzle-storage-es-8

The Elasticsearch 8 storage driver for [Kuzzle](https://github.com/kuzzleio/kuzzle) 2.

`kuzzle-storage-es-8` is the Elasticsearch 8 storage driver of [Kuzzle](https://github.com/kuzzleio/kuzzle) 2: the code Kuzzle used to embed for Elasticsearch 8, moved as it is to its own package. Same mappings, same queries, same errors.

📖 Full documentation: https://docs.kuzzle.io/drivers/storage-es-8/1/

## Install

Nothing to install: Kuzzle 2 depends on `kuzzle-storage-es-8` at a pinned version and installs it with itself. It is the
**built-in** Elasticsearch 8 driver, the one Kuzzle runs when `services.storageEngine.majorVersion` is `"8"`:

```jsonc
{
  "services": {
    "storageEngine": {
      "majorVersion": "8",
      "client": { "node": "http://localhost:9200" }
    }
  }
}
```

An existing Elasticsearch 8 application keeps its `.kuzzlerc` and its `package.json` unchanged.

### Select it by name

You can also name the driver, as you would an external one. This is how Kuzzle 3 will select every storage engine
(`majorVersion` is deprecated, see [Towards Kuzzle 3](https://docs.kuzzle.io/core/2/guides/kuzzle-3/)). Add the package to your
application, at the version your Kuzzle depends on (`npm ls kuzzle-storage-es-8`), then set `driver`:

```bash
npm install kuzzle-storage-es-8@<the version npm ls shows>
```

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

With `driver` set, `majorVersion` is ignored, and Kuzzle logs a warning if both are set: remove `majorVersion`.
The same works with the `kuzzle_services__storageEngine__driver` environment variable.

The rest of `services.storageEngine` (`client`, `commonMapping`, `defaultSettings`, `internalIndex`...) works as
before: see [Configuration](https://docs.kuzzle.io/drivers/storage-es-8/1/configuration/).

## Requirements

- Kuzzle 2.61 or later, within Kuzzle 2. Older versions do not know `services.storageEngine.driver` and silently
  ignore it: they run the Elasticsearch code they embed, not this package.
- Elasticsearch 8.x (tested on 8.0.1 and 8.19.23); the driver refuses any other version at startup
- Node.js 22.12 or later

Every node of a Kuzzle cluster must run the same driver, in the same version.

## TypeScript

The package ships its declarations. It exports the driver class, `ES8Driver` (also its default export), whose static
`createNativeClient()` builds an `@elastic/elasticsearch` 8.17.1 `Client`. To type the native client Kuzzle gives
your application:

```ts
import type { ES8Driver } from "kuzzle-storage-es-8";

type StorageClient = ReturnType<typeof ES8Driver.createNativeClient>;

const client = app.storage.storageClient as StorageClient;
```

See [TypeScript](https://docs.kuzzle.io/drivers/storage-es-8/1/typescript/).

## Capabilities

The driver declares every optional capability (`aggregations`, `mappingUpdates`, `stats`, `updateByQuery`): every
Kuzzle API action works.

## Development

```bash
npm ci
npm run test:unit   # the unit suite, no Elasticsearch needed

docker run -d -p 9200:9200 -e discovery.type=single-node -e xpack.security.enabled=false elasticsearch:8.17.1
npm test            # the unit suite and Kuzzle's conformance kit, against ELASTICSEARCH_NODE (default http://localhost:9200)
```

`npm run lint`, `npm run typecheck` and `npm run build` complete the checks the CI runs. The unit suite is the same in
the [storage-es-7](https://github.com/kuzzleio/storage-es-7), [storage-es-8](https://github.com/kuzzleio/storage-es-8)
and [storage-es-9](https://github.com/kuzzleio/storage-es-9) repositories: only `test/unit/elasticsearch.test.ts` and
`test/unit/esWrapper.test.ts` name their driver.

### Shared code

The five storage drivers ([storage-es-7](https://github.com/kuzzleio/storage-es-7),
[storage-es-8](https://github.com/kuzzleio/storage-es-8), [storage-es-9](https://github.com/kuzzleio/storage-es-9),
[storage-opensearch-2](https://github.com/kuzzleio/storage-opensearch-2),
[storage-opensearch-3](https://github.com/kuzzleio/storage-opensearch-3)) share most of their code. A drift guard,
`npm run check:drift` (run by the CI), checks that the shared files listed in `scripts/check-drift.sh` are identical to
their canonical copy, in `storage-es-8` at the commit `scripts/drift.env` pins; `ALLOW` there lists the shared files
a repository deliberately keeps different. To change a shared file, change it in `storage-es-8` first, copy it to the
other drivers, then move `CANONICAL_REF` to that commit in all five.

To write a driver for another engine, see
[Write a storage driver](https://docs.kuzzle.io/core/2/guides/write-storage-drivers/).

## Release

Releases are made by semantic-release: `beta` publishes prereleases on the `beta` npm tag, `master` publishes stable
versions. The documentation is in `doc/1/`.

## License

[Apache-2.0](LICENSE.md)
