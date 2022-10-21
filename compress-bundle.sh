minify -v >/dev/null 2>&1 || { 
  echo >&2 "I require minify but it's not installed. ";
  echo 
  echo -n "Installing minify globally (npm i -g minify)...";
  npm i -g minify;
}

echo
echo -e "$(tput bold) Detected Minify. $(tput sgr0)";
echo
echo Start compressing javascript file with minify safir.min.js;
minify dist/bundle.js > dist/bundle.min.js;
echo -e "$(tput setaf 2)Compressing javascript files done$(tput sgr0).";
echo -e "Safir is compressed! $(tput sgr0).";
echo