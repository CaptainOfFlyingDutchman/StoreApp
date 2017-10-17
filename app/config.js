import base64 from 'Base64';

export const username = 'Test';
export const password = '123@Test';

export const getCredentials = (user, pass) => `${user}:${pass}`;

export const getEncodedCredentials = (user = username, pass = password) =>
  `${base64.btoa(getCredentials(user, pass))}`;

export const getAuthorizationHeaderValue = (user = username, pass = password) =>
  `Basic ${getEncodedCredentials(user, pass)}`;

export const navUrl = "http://navserver.baqala.me:9348/Nav9Mob/OData/Company('Bodega Grocery Company LIVE')";

