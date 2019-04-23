#! /bin/bash
DATE=$(date '+%m/%d/%y-%H.%M.%S')
READABLE_DATE=$(date '+%m/%d/%y %H:%M:%S')

git checkout master;
git checkout -b heroku-$DATE;
rm -rf client/*;
rm -rf node_modules;
mv server/* .;
rmdir server;
rm -f yarn.lock;
sed -i '' -e 's/^diningv2-4a304/# &/' ./.gitignore;
read -p "Add secret json file if missing. Press [Enter] to continue...";
npm install;
npm audit fix;
npm run build;
git add --all;
git commit -m "Heroku deployment for ${READABLE_DATE}";
heroku login;
heroku git:remote -a serverv2;
git push -f heroku heroku-$DATE:master;
git checkout master;