#! /bin/bash
DATE=$(date '+%m/%d/%y-%H.%M.%S')
READABLE_DATE=$(date '+%m/%d/%y %H:%M:%S')

git checkout master;
git checkout -b heroku-$DATE;
rm -r client/*;
rm -r node_modules;
mv server/* .;
rmdir server;
rm -f yarn.lock;
sed -i '' -e 's/^diningv2-4a304/# &/' ./.gitignore;
read -p "Check for presence of secret file. Press [Enter] to continue...";
npm install;
npm run build;
git add --all;
git commit -m "Heroku deployment for ${READABLE_DATE}";
read -p "Delete old endpoints if > 5. Press [Enter] to continue...";
heroku login;
heroku create;
read -p "Change name to serverv2 on heroku, after changing current serverv2. Press [Enter] to continue...";
heroku git:remote -a serverv2;
git push heroku heroku-$DATE:master;
git checkout master;