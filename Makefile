deps: 
	cat htdocs/static/js/lib_deps.js > htdocs/static/js/deps.js
	python htdocs/static/lib/closure-library/closure/bin/calcdeps.py -i htdocs/static/js/app.js -p htdocs/static/js/ -o deps >> htdocs/static/js/deps.js

tools-init:
	wget https://closure-stylesheets.googlecode.com/files/closure-stylesheets-20111230.jar -O tools/closure-stylesheets.jar

submodule-init:
	git submodule init
	git submodule update

build-css:
	# compiling css
	java -jar tools/closure-stylesheets.jar --pretty-print --output-file htdocs/static/build/netlayers.css $(shell find ./htdocs/static/js/ -type f -name "*.css" -printf "%p ")
	
	
runserver:
	cd htdocs/ && python -m SimpleHTTPServer
