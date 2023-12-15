now=`date +%Y-%m-%d-%H-%M-%S`

cp -R templete/basic src/$now
code -r src/$now/sketch.js
cd src/$now
live-server