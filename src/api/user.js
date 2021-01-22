import request from "@/utils/http";

export function loginWithPhone(data) {
  return request.post("/login/cellphone", data);
}

export function loginWithEmail(data) {
  return request.post("/login", data);
}

export function checkUserStatus() {
  return request.get("/user/account");
}

export function getPfrofile(params) {
  return request.get("/user/detail", { params });
}
