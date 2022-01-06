#!/bin/bash
set -e
set -o pipefail

args=("${@:1}")

if [[ "${args[0]}" = 'delivery' ]]; then
  cd /opt/delivery
  export PATH="$PATH:$(pwd)/node_modules/.bin"

  args=(node dist/server.js)
fi

exec -- "${args[@]}"
