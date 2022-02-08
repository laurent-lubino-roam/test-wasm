class WasmLoader {
  constructor() {}
  async load(path) {
    console.log(`Loading ${path}`);
    if (!WebAssembly.instantiateStreaming) {
      return this.loadFallback(path);
    }

    const { instance } = await WebAssembly.instantiateStreaming(fetch(path));
    console.log("done");
    return instance?.exports;
  }
  async loadFallback() {
    console.log("Using fallback");

    const response = await fetch(path);
    const bytes = await response?.arrayBuffer();
    const { instance } = WebAssembly.instantiate(bytes);
    console.log("done");
    return instance?.exports;
  }
}
