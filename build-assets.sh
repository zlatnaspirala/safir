#!/bin/bash
# Project: Smaragd 1.0.0
# Tested on windows bash terminal
echo -e "$(tput bold) . $(tput sgr0)";
mkdir -p dist/assets;
mkdir -p dist/vanilla-components;
yes | cp -Rf examples/hello/assets/* dist/assets;
cp -Rf examples/hello/vanilla-components/* dist/vanilla-components;
cp index.html dist/index.html;
cp examples/hello/css/style.css dist/style.css;
echo
echo -e "$(tput bold) Smaragd assets bulder $(tput sgr0)";
echo -e "$(tput setaf 4) Final production pack at: /dist";
echo -e "Crazy good and fast! $(tput sgr0).";
echo
