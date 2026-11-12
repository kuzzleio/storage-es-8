## [1.1.0](https://github.com/kuzzleio/storage-es-8/compare/v1.0.0...v1.1.0) (2026-11-03)

### Dependencies

* **deps:** drop bluebird ([3638701](https://github.com/kuzzleio/storage-es-8/commit/3638701bb3f980498779ff2ef9a7662cdbf2ba66))

### Features

* close the engine client on Kuzzle's shutdown ([d47a7ae](https://github.com/kuzzleio/storage-es-8/commit/d47a7ae822122c01a1a719bace0b238daa223068)), closes [kuzzleio/kuzzle#3141](https://github.com/kuzzleio/kuzzle/issues/3141)

### Bug Fixes

* keep lodash types out of the shipped declarations ([8f6eee2](https://github.com/kuzzleio/storage-es-8/commit/8f6eee2c0e393e255581b314a70fbc7cd5640618))
* map the engines' actual error messages to storage errors ([fca2ee5](https://github.com/kuzzleio/storage-es-8/commit/fca2ee5c3ae0603c9b8db87917ffd57fa855ae08))
* refuse an Elasticsearch 9 cluster and an OpenSearch one ([aeb9588](https://github.com/kuzzleio/storage-es-8/commit/aeb95889b01b9b2a07db92eb2efb107127d235df))

## 1.0.0 (2026-10-31)

### Features

* Elasticsearch 8 storage driver for Kuzzle ([091008c](https://github.com/kuzzleio/storage-es-8/commit/091008c8271645f9e3203baf258aa80d7677e2a1))
