#!/bin/sh

echo "build"

statik -src=web
go build
rm kanojo-dot-exe