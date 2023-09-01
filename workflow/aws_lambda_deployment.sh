#!/bin/sh

echo ">>> transpiling..."
cd ~/snow-revou/week-11-gkorompis/server/src
pwd
npx tsc
cd ..
pwd
echo ">>> compress deploy file"
zip -r deploy.zip . -x "src/*" "misc/*" "test*" "*.sh" "./testenv.js" "cek/*" "lambda.js"
echo ">>> upload to aws s3 bucket"
aws s3 cp deploy.zip s3://revou-week11-00
