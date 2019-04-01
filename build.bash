#!/bin/bash
# Packages up plugin.

# -e Fail on error
# -u Fail on unset
# -o pipefail Check right most exit code
# -x - For debugging.
set -euo pipefail

ICON_PATH='./src/icons';
ICON_SMALL="$ICON_PATH/icon.png";
ICON_LARGE="$ICON_PATH/icon@2x.png";
ICON_RAW="$ICON_PATH/icon-raw.png";

resizecrush() {
  local size=$1;
  local finalName=$2;
  local tmpFile=$(mktemp)

  echo Resizing to "$size"x"$size"...
  convert -resize "$size"x"$size" $ICON_RAW $tmpFile;
  echo Crushing...
  pngcrush $tmpFile $tmpFile.crushed
  echo Renaming...
  mv $tmpFile.crushed $finalName;
}

if [ ! -f $ICON_SMALL ] || [ ! -f $ICON_LARGE ]; then
  echo -e "\033[33mIcons not found! Resizing and crushing...\033[0;39m";

  if [ ! -f $ICON_RAW ]; then
    echo -e "\033[31mNo icons found!\033[0;39m";
    exit 1;
  fi

  resizecrush 48 $ICON_SMALL
  resizecrush 96 $ICON_LARGE
fi

# What to package:
# - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Package_your_extension_
echo Zipping up package...
cd src/
zip -r -FS ../bin/google-maps-everywhere-csp.zip ./ --exclude *icon-raw.png .*
echo done.
