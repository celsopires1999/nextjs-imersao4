#!/bin/sh

if [ ! -f ".env.local" ]; then
    cp .env.local.example .env.local
fi

npm install

# tail -f /dev/null

npm run dev
