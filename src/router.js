const handlers = require('./handler.js');

const router = (request, response) => {

  const endpoint = request.url;
  console.log(endpoint);
  if (endpoint === '/') {
   handlers.homeHandler(request, response);
  }
  else if (endpoint.indexOf('public') !== -1) {
    handlers.staticFileHandler(request, response, endpoint);
  }
  else if (endpoint.indexOf('search') !== -1) {
    handlers.searchHandler(request, response, endpoint);
  }
  else if (endpoint.indexOf('add-event') !== -1) {
    handlers.addEventHandler(request, response, endpoint);
  }
  //Added
  else if (endpoint.indexOf('searchEventAdded')!== -1){
    console.log('in search event added');
     handlers.searchLastEventAdded(request,response,endpoint);
  }
  else if (endpoint.indexOf('get-hosts')!== -1){
     handlers.getHostsHandler(request,response,endpoint);
  }else {
    console.log('not in endpoint');
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 resource not found');
  }
}

module.exports = router;
