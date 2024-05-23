#!/bin/bash
# Project: Safir 1.1.7
# Tested on windows bash terminal
echo -e "$(tput bold) . $(tput sgr0)";
mkdir -p public/assets;
mkdir -p public/css;
mkdir -p public/vanilla-components;
yes | cp -Rf hello/assets/* public/assets;
cp -Rf hello/vanilla-components/* public/vanilla-components;
cp index.html public/index.html;
# cp hello/css/style.css public/css/style.css;
echo
echo -e "$(tput bold) Safir assets bulder $(tput sgr0)";
echo -e "$(tput setaf 4) Final production pack at: /public";
echo -e "Crazy good and fast! $(tput sgr0).";
echo
