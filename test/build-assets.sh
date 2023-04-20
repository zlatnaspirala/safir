#!/bin/bash

# Project: Safir 1.0.7
# Tested on windows bash terminal

echo -e "$(tput bold) . $(tput sgr0)";
mkdir -p dist/assets;
mkdir -p dist/css;
mkdir -p dist/vanilla-components;
yes | cp -Rf hello/assets/* dist/assets;
cp -Rf hello/vanilla-components/* dist/vanilla-components;
cp index.html dist/index.html;
echo
echo -e "$(tput bold) Safir assets bulder $(tput sgr0)";
echo -e "$(tput setaf 4) Final production pack at: /dist";
echo -e "Crazy good and fast! $(tput sgr0).";
echo
