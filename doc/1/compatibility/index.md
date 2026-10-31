---
code: false
type: page
title: Compatibility
order: 400
description: Versions and capabilities of the Elasticsearch 8 storage driver
---

# Compatibility

## Versions

|                      |                                                                     |
| -------------------- | ------------------------------------------------------------------- |
| Kuzzle               | 2.61 or later, within Kuzzle 2 (`kuzzleVersion` in `manifest.json`) |
| Elasticsearch        | 8.x (tested on 8.17.1)                                              |
| Elasticsearch client | `@elastic/elasticsearch` 8.17.1                                     |
| Node.js              | 22.12 or later                                                      |

At startup, Kuzzle reads the driver's `manifest.json` before loading it, and does not start when its version is out of
the `kuzzleVersion` range. The driver then refuses an Elasticsearch cluster older than 8.0.0.

Kuzzle 2 pins the version of this driver: a new driver version reaches you with a Kuzzle release. Kuzzle 3 drops it from its dependencies, see [Towards Kuzzle 3](/core/2/guides/kuzzle-3).

## Capabilities

A driver lists the optional features it implements in the `capabilities` field of its manifest. This one declares
them all, so every Kuzzle API action works:

| Capability       | Feature                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `aggregations`   | `aggregations` / `aggs` in a search body                                                       |
| `mappingUpdates` | changing the mappings or the settings of an existing collection, including the users' mappings |
| `stats`          | storage statistics (`index:stats`)                                                             |
| `updateByQuery`  | updating every document matching a query (`document:updateByQuery`, `bulk:updateByQuery`)      |

## Clusters

Every node of a Kuzzle cluster must run the same driver, in the same version: a node running another one is refused
when it joins, with a [cluster.join.storage_driver_mismatch](/core/2/api/errors/error-codes/cluster) error.
Nodes selecting the driver with `majorVersion` are not compared: they run the version their Kuzzle pins.
Upgrading the driver means restarting every node on the new version, not a rolling restart.
