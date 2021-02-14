#!/bin/sh

CMDNAME=`basename $0`
if [ $# -ne 1 ]; then
  echo "Usage: $CMDNAME file_name" 1>&2
  exit 1
fi

echo "Processing: $1"

# optimize
convert $1 -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB il-xx-1x-min.jpg
convert $1 -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB il-xx-thumbnail-min.jpg

# resize
mogrify -resize 400x il-xx-1x-min.jpg

v=$(identify -format "%w,%h" $1)
list=(${v//,/ })

if [ ${list[0]} -ge ${list[1]} ]; then
	mogrify -resize x1500 il-xx-thumbnail-min.jpg
else
	mogrify -resize 1500x il-xx-thumbnail-min.jpg
fi

exit 0