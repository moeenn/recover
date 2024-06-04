var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
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
export {
  recover,
  recoverAsync
};
//# sourceMappingURL=index.mjs.map