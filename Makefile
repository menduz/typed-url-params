
ifneq ($(CI), true)
LOCAL_ARG = --local --verbose --diagnostics
endif

build:
	./node_modules/.bin/tsc -p tsconfig.json
	./node_modules/.bin/api-extractor run $(LOCAL_ARG) --typescript-compiler-folder ./node_modules/typescript
	node dist/test.js

.PHONY: build