const API_HOST = "http://127.0.0.1:8000"

const request = (url) => fetch(API_HOST + url, {
  method: "GET",
  headers: {
    "Content-Type": "application/text",
  },
});