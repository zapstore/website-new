#!/bin/bash

rm -fr build/
npm run build
/usr/bin/rsync -avz build/ zapstore:/srv/zapstore
