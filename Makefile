
ifneq ($(CI), true)
LOCAL_ARG = --local --verbose --diagnostics
endif

build:
	./node_modules/.bin/tsc -p tsconfig.json
	node dist/test.js
	rm -rf node_modules/@microsoft/api-extractor/node_modules/typescript || true
	./node_modules/.bin/api-extractor run $(LOCAL_ARG) --typescript-compiler-folder ./node_modules/typescript

.PHONY: build