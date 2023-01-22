# Ghost IPFS Storage Adapter

<img alt="ghost-ipfs" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/banner.png" />

[IPFS](https://ipfs.tech) (Filebase, Pinata, Fleek, Web3, Lighthouse) storage adapter for [Ghost](https://github.com/TryGhost/Ghost).

## Installation

### Install using yarn/npm/git

- Go into Ghost root directory
- Download the adapter:

```bash
# using yarn
yarn add ghost-ipfs

# or using npm
npm install ghost-ipfs --save

# create dir
mkdir -p content/adapters/storage

# move
mv node_modules/ghost-ipfs content/adapters/storage/ghost-ipfs

# or using git
git clone \
    https://github.com/alexbakers/ghost-ipfs \
    content/adapters/storage/ghost-ipfs
```

- Done, go configure

### Install on Docker

Here's an example of using this adapter with a containerized Ghost:

```Dockerfile
FROM ghost:5-alpine as ipfs
RUN apk add g++ make python3
RUN su-exec node yarn add ghost-ipfs

FROM ghost:5-alpine
COPY --chown=node:node --from=ipfs $GHOST_INSTALL/node_modules $GHOST_INSTALL/node_modules
COPY --chown=node:node --from=ipfs $GHOST_INSTALL/node_modules/ghost-ipfs $GHOST_INSTALL/content/adapters/storage/ghost-ipfs

# Here, we use the Ghost CLI to set some pre-defined values.
RUN set -ex; \
    su-exec node ghost config storage.active ghost-ipfs; \
    su-exec node ghost config storage.ghost-ipfs.defaultStorage "filebase"; \

    # https://console.filebase.com/keys
    su-exec node ghost config storage.ghost-ipfs.filebase.key "FILEBASE_KEY"; \
    su-exec node ghost config storage.ghost-ipfs.filebase.secret "FILEBASE_SECRET"; \
    su-exec node ghost config storage.ghost-ipfs.filebase.bucket "FILEBASE_BUCKET"; \

    # https://app.pinata.cloud/keys
    su-exec node ghost config storage.ghost-ipfs.pinata.jwt "PINATA_JWT"; \

    # https://app.fleek.co/#/settings/general/profile
    su-exec node ghost config storage.ghost-ipfs.fleek.key "FLEEK_KEY"; \
    su-exec node ghost config storage.ghost-ipfs.fleek.secret "FLEEK_SECRET"; \
    su-exec node ghost config storage.ghost-ipfs.fleek.bucket "FLEEK_BUCKET"; \

    # https://web3.storage/tokens/
    su-exec node ghost config storage.ghost-ipfs.web3.token "WEB3_TOKEN";

    # https://files.lighthouse.storage/dashboard/apikey
    su-exec node ghost config storage.ghost-ipfs.lighthouse.token "LIGHTHOUSE_TOKEN";
```

Make sure to set the content path right in the Ghost config as well:

```json
"paths": {
    "contentPath": "/var/lib/ghost/content/"
}
```

## Configuration

- tokens/keys on `./config.production.json`

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "filebase",
      "filebase": {
        "key": "FILEBASE_KEY",
        "secret": "FILEBASE_SECRET",
        "bucket": "FILEBASE_BUCKET"
      },
      "pinata": {
        "jwt": "PINATA_JWT"
      },
      "fleek": {
        "key": "FLEEK_KEY",
        "secret": "FLEEK_SECRET",
        "bucket": "FLEEK_BUCKET"
      },
      "web3": {
        "token": "WEB3_TOKEN"
      },
      "lighthouse": {
        "token": "LIGHTHOUSE_TOKEN"
      }
    }
  }
  // ...
}
```

- or tokens/keys on `.env`

```bash
FILEBASE_KEY=""
FILEBASE_SECRET=""
FILEBASE_BUCKET=""

PINATA_JWT=""

FLEEK_KEY=""
FLEEK_SECRET=""
FLEEK_BUCKET=""

WEB3_TOKEN=""

LIGHTHOUSE_TOKEN=""
```

`./config.production.json`

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "filebase"
    }
  }
  // ...
}
```

## Configuration Ghost + Filebase

<img alt="Configuration Ghost + Filebase" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/filebase.png" />

| Variable | Type   | Description            | Required |
| -------- | ------ | ---------------------- | -------- |
| key      | string | Filebase access key    | yes      |
| secret   | string | Filebase access secret | yes      |
| bucket   | string | Filebase bucket name   | yes      |

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "filebase",
      "filebase": {
        "key": "FILEBASE_KEY",
        "secret": "FILEBASE_SECRET",
        "bucket": "FILEBASE_BUCKET"
      }
    }
  }
  // ...
}
```

## Configuration Ghost + Pinata

<img alt="Configuration Ghost + Pinata" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/pinata.png" />

| Variable | Type   | Description                      | Required |
| -------- | ------ | -------------------------------- | -------- |
| jwt      | string | Pinata JWT (Secret access token) | yes      |

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "pinata",
      "pinata": {
        "jwt": "PINATA_JWT"
      }
    }
  }
  // ...
}
```

## Configuration Ghost + Fleek

<img alt="Configuration Ghost + Fleek" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/fleek.png" />

| Variable | Type   | Description                            | Required |
| -------- | ------ | -------------------------------------- | -------- |
| key      | string | Fleek Storage API key                  | yes      |
| secret   | string | Fleek Storage API secret               | yes      |
| bucket   | string | Fleek bucket name (e.g. 71a...-bucket) | yes      |

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "fleek",
      "fleek": {
        "key": "FLEEK_KEY",
        "secret": "FLEEK_SECRET",
        "bucket": "FLEEK_BUCKET"
      }
    }
  }
  // ...
}
```

## Configuration Ghost + Web3

<img alt="Configuration Ghost + Web3" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/web3.png" />

| Variable | Type   | Description            | Required |
| -------- | ------ | ---------------------- | -------- |
| token    | string | Web3 Storage API Token | yes      |

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "web3",
      "web3": {
        "token": "WEB3_TOKEN"
      }
    }
  }
  // ...
}
```

## Configuration Ghost + Lighthouse

<img alt="Configuration Ghost + Lighthouse" src="https://raw.githubusercontent.com/alexbakers/ghost-ipfs/main/public/lighthouse.png" />

| Variable | Type   | Description                 | Required |
| -------- | ------ | --------------------------- | -------- |
| token    | string | Lghthouse Storage API Token | yes      |

```json
{
  // ...
  "storage": {
    "active": "ghost-ipfs",
    "ghost-ipfs": {
      "defaultStorage": "lighthouse",
      "lighthouse": {
        "token": "LIGHTHOUSE_TOKEN"
      }
    }
  }
  // ...
}
```

## Links

- [Ghost website](https://ghost.org/)
- [IPFS website](https://ipfs.tech/)
- [Filebase website](https://filebase.com/)
- [Pinata website](https://pinata.cloud/)
- [Fleek website](https://fleek.co/)
- [Web3 website](https://web3.storage/)
- [Lighthouse website](https://lighthouse.storage/)

---

`(c)` Alex Baker
