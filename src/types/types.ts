export interface IUser {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  id: { name: string; value: string };
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: string;
    state: string;
    street: { number: number; name: string };
    timezone: { offset: string; description: string };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: { title: string; first: string; last: string };
  nat: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  registered: { date: string; age: number };
  zoneId: number;
}
export interface IZone {
  zoneName: string;
  zoneId: number;
}
