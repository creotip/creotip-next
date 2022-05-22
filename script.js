import http from 'k6/http'
import { sleep } from 'k6'

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const url = 'https://www.npoint.io/documentsr'
  const payload = JSON.stringify({
    contents:
      '{\n  "rex": "a simple JSON data store",\n  "why": [\n    "quick setup",\n    "easy editing",\n    "schema validation"\n  ]\n}',
  })

  const params = {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,he;q=0.8,ru;q=0.7',
      'cache-control': 'no-cache',
      'content-type': 'application/json;charset=UTF-8',
      pragma: 'no-cache',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-csrf-token':
        'DB1RRbtvDeKrJCw25X2orqovE5e2YnZgvWpfvCQ6vUXelHdXQJpyZOMxvgy12O9uaymO+nA6fFenWbRUAOPvpw==',
      cookie:
        '_npoint_session=RThhMm5scGhzcXlUMDlUb2w1TGc2bXoxQ3JSTTcxMXcxcmdRZWxDcXVrNnpNVHc3REY0YUNGQll3YjEwZHhUVUlxK1F0Z005a1VrMTVUMzlramFjTHcxUGZOdi9Hd1E3K2h1QVBuREtXODJ3RUZXa3c5NHFMc2kwRzROUXpMV0txVS9ZMytLUVJaUlVhaXZReFVMSGtRPT0tLTJpOEdDZlVPaWpwSHNDTDRVT0RZYVE9PQ%3D%3D--076304873ff53ead16def293db0c4349905d23c7; crisp-client%2Fsession%2F6a4a83f5-2991-4055-9980-307cf3d01be0=session_d69103f0-b733-4275-ba19-f187f5492bbd',
      Referer: 'https://www.npoint.io/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  }

  http.post(url, payload, params)
}
