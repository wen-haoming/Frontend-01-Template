const net = require("net");

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;

    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;

    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;

    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParse = null;
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChair(string[i]);
    }
  }
  receiveChair(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      // this.statusLine += char
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
      } else if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITING_BODY;
        if(this.headers){
        //    this.bodyParse = new Trunk
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerValue = ''
        this.headerValue = ''
    } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    }
  }
}

class Request {
  // method
  // body
  // headers
  constructor(options) {
    this.method = options.method || "GET";
    this.path = options.path || "/";
    this.host = options.host;
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join("\r\n")}

${this.bodyText}
        `;
  }
  open(method, url) {}
  send(connection) {
    return new Promise((resolve, reject) => {
      let responseParser = new ResponseParser();

      if (connection) {
        connection.write(this.toString());
      } else {
        let client = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            client.write(this.toString());
          }
        );
        client.on("data", (data) => {
          responseParser.receive(data.toString());
          console.log(responseParser.headers)
          // resolve(data.toString())
        });
        client.on("error", (err) => {
          reject(err);
          client.end();
        });
      }
    });
  }
}

let request = new Request({
  method: "POST",
  host: "127.0.0.1",
  port: 8088,
  body: {
    name: "hello",
  },
});
request.send().then((res) => {
  // console.log(res)
});
