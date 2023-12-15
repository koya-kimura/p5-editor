now=`date +%Y-%m-%d-%H-%M-%S`

cp -R templete/shader src/$now
code -r src/$now/sketch.js
cd src/$now
live-server