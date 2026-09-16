#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    printf "%s\n" "$1" "$2" "$3"
fi