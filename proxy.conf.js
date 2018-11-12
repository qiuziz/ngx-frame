const PROXY_CONFIG = [
  {
    context: [
      "/project/"
    ],
    target: "http://192.168.101.140:3081",
    secure: false
  }
]
module.exports = PROXY_CONFIG;
