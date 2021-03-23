export default class AstronomyPic {  
  static getPic() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}