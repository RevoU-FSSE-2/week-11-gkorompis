#!/bin/sh
echo ">>> compress deploy file"
zip -r deploy.zip . -x "src/*" "misc/*" "test.js" "*.sh" "./testenv.js" "cek/*"
echo ">>> upload to aws s3 bucket"
aws s3 cp deploy.zip s3://revou-week10-00
