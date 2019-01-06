function getApiOrigin() {
  switch(window.location.host) {
    case 'www.nominee.oscars.org':
    case 'nominee.oscars.org':
    default:
      return 'http://localhost:4000';
  }
}

const apiConfig = {
  token: "c?M3cwHGsvqP@JES",
  origin: getApiOrigin()
}

export default apiConfig;