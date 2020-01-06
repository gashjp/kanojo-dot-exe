#!/bin/sh

echo "binary build"

statik -src=web
go build

./kanojo-dot-exe