export const setToken = (token, ttl = 1000 * 60 * 60 * 24) => {
  const now = new Date();

  const item = {
    value: token,
    ttl: now.getTime() + ttl,
  };

  localStorage.setItem("token", JSON.stringify(item));
};

export const getToken = () => {
  const itemStr = localStorage.getItem("token");

  if (!itemStr) {
    return null;
  }

  let item = "";
  try {
    item = JSON.parse(itemStr);
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    return null;
  }
  const now = new Date();

  if (now.getTime() > item.ttl) {
    localStorage.removeItem("token");
    return null;
  }

  return item.value;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getToken, setToken };
