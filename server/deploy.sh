#! /bin/bash
DATE=$(date '+%m/%d/%y-%H.%M.%S')
READABLE_DATE=$(date '+%m/%d/%y %H:%M:%S')

git checkout master;
git checkout -b heroku-$DATE;
rm -rf client/*;
mv src/* ./*;
rmdir src;
rm -f yarn.lock;
sed -i '/^diningv2-4a304/d' ./.gitignore;
npm install && npm audit fix;
npm run build;
git commit -a -m "Heroku deployment for ${READABLE_DATE}";
# TODO: fix these lines
git push -f heroku master;
git checkout master;