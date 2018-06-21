import request from "../shared/RequestService";

export default class TeamsService {

  static getToken = () => {
    return new Promise((resolve, reject) => {
      request.get('v1/session/token')
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  static getAllRecords = () => {
    return new Promise((resolve, reject) => {
      request.get('v3/records/all')
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  static getRecord = data => {
    let config = {
      headers: {
        token: sessionStorage.getItem("session_token")
      }
    }
    return new Promise((resolve, reject) => {
      request.post('v1/passwords/record', data ,config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

}