"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  recover: () => recover,
  recoverAsync: () => recoverAsync
});
module.exports = __toCommonJS(src_exports);
var ok = /* @__PURE__ */ __name((result) => ({
  ok: result,
  error: null
}), "ok");
var error = /* @__PURE__ */ __name((error2) => ({
  ok: null,
  error: error2
}), "error");
function recover(cb) {
  let result;
  try {
    result = cb();
  } catch (err) {
    if (err instanceof Error) {
      return error(err);
    }
    return error(new Error("Unknown error occured"));
  }
  return ok(result);
}
__name(recover, "recover");
async function recoverAsync(cb) {
  let result;
  try {
    result = await cb();
  } catch (err) {
    if (err instanceof Error) {
      return error(err);
    }
    return error(new Error("Unknown error occured"));
  }
  return ok(result);
}
__name(recoverAsync, "recoverAsync");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  recover,
  recoverAsync
});
//# sourceMappingURL=index.js.map