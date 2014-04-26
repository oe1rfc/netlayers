deps: 
	cat htdocs/static/js/lib_deps.js > htdocs/static/js/deps.js
	python htdocs/static/lib/closure-library/closure/bin/build/depswriter.py --root_with_prefix="htdocs/static/js ../../../../js" >> htdocs/static/js/deps.js

tools-init:
	mkdir -p htdocs/static/build/
	test -s tools/closure-stylesheets.jar || \
	wget https://closure-stylesheets.googlecode.com/files/closure-stylesheets-20111230.jar -O tools/closure-stylesheets.jar

submodule-init:
	git submodule init
	git submodule update

build-submodules:
	cd htdocs/static/lib/ol3 && python build.py build

repo-init:	tools-init submodule-init build-submodules deps build-css


build-css:
	# compiling css
	java -jar tools/closure-stylesheets.jar --pretty-print --output-file htdocs/static/build/netlayers.css $(shell find ./htdocs/static/js/ -type f -name "*.css" -printf "%p ")
	
	
runserver:
	cd htdocs/ && python -m SimpleHTTPServer
