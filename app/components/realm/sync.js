import Realm from './index';
import { fetchWrapper } from '../../request';
import { navUrl, getAuthorizationHeaderValue } from '../../config';

const settingFromRealm = Realm.objects('Setting');

this._navUrl = (settingFromRealm.length && settingFromRealm[0].navUrl) || navUrl;

if (settingFromRealm.length && settingFromRealm[0].navUser && settingFromRealm[0].navPassword) {
  this._authorizationHeaderValue =
    getAuthorizationHeaderValue(settingFromRealm[0].navUser, settingFromRealm[0].navPassword);
} else {
  this._authorizationHeaderValue = getAuthorizationHeaderValue();
}

export const syncData = ({ location = true, setting = true, vendor = false } = {}) => {
  const requests = [];

  if (location) {
    requests.push(
      fetchWrapper(`${this._navUrl}/Stores?$format=json`, this._authorizationHeaderValue)
    );
  }
  if (setting) {
    requests.push(
      fetchWrapper(`${this._navUrl}/CompanySetting?$format=json`, this._authorizationHeaderValue)
    );
  }
  if (vendor) {
    requests.push(
      fetchWrapper(`${this._navUrl}/Vendors?$format=json`, this._authorizationHeaderValue)
    );
  }

  return Promise.all(requests)
    .then((responses) => {
      resolveResponse(location,
        responses.find(response => response.url.includes('Stores')), syncLocation);

      resolveResponse(setting,
        responses.find(response => response.url.includes('Setting')), syncSetting);

      resolveResponse(vendor,
        responses.find(response => response.url.includes('Vendors')), syncVendor);
    });
};

/**
 *
 * @param {boolean} type Type of data to resolve for i.e., location, setting, item and vendor.
 * @param {Response} response Response from the fetch call.
 * @param {Function} syncResponseFunction Function to call to sync the fetch response with realm.
 */
/* eslint-disable consistent-return */
const resolveResponse = (type, response, syncResponseFunction) => {
  if (type && response.ok) {
    syncResponseFunction(response);
  } else if (type && !response.ok) {
    return rejectPromise();
  }
};

const rejectPromise = () => Promise
  .reject('Couldn\'t sync setting.\n\nUsers exceed. Please try again later.');

const syncLocation = (response) => {
  response.json()
    .then((responseJson) => {
      responseJson.value.forEach((dataItem) => {
        try {
          Realm.write(() => {
            Realm.create('Location', {
              id: dataItem.POS_Department_ID,
              name: dataItem.Location_Code,
              password: dataItem.Password
            }, true);
          });
        } catch (e) {
          console.log(e);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const syncSetting = (response) => {
  response.json()
    .then((responseJson) => {
      responseJson.value.forEach((dataItem) => {
        try {
          Realm.write(() => {
            Realm.create('Setting', {
              navUrl: dataItem.navUrl,
              navUser: dataItem.navUser,
              navPassword: dataItem.navPassword,
              currentUser: '',
              returnReasonCode: dataItem.returnReasonCode || ''
            }, true);
          });
        } catch (e) {
          console.log(e);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

let barCodes = [];

export const syncItem = (syncUrl, callback) => {
  if (syncUrl === 'done') {
    return syncItemResponse(callback);
  }
  fetchWrapper(syncUrl || `${this._navUrl}/Barcodes?$format=json`, this._authorizationHeaderValue)
    .then((response) => {
      if (response.ok) {
        getNextLink(response, callback);
      } else {
        return callback('Couldn\'t sync barcodes. Please try again later.');
      }
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};

const syncItemResponse = (callback) => {
  barCodes.forEach((barCode) => {
    try {
      Realm.write(() => {
        Realm.create('Item', {
          barCode: barCode.Bar_Code,
          no: barCode.Item_No,
          description: barCode.Description,
          unitCost: Number.parseFloat(barCode.Unit_Cost),
          vendorId: barCode.Vendor_No,
          vendorName: '',
          uom: barCode.AuxiliaryIndex1
        }, true);
      });
    } catch (e) {
      console.log(e);
    }
  });
  barCodes = [];
  callback();
};

const getNextLink = (response, callback) => {
  response.json()
    .then((responseJson) => {
      barCodes = [...barCodes, ...responseJson.value];

      const nextLink = responseJson['odata.nextLink'];
      if (nextLink) {
        const jsonLink = `${nextLink}&$format=json`;
        syncItem(jsonLink, callback);
      } else {
        syncItem('done', callback);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const syncVendor = (response) => {
  response.json()
    .then((responseJson) => {
      responseJson.value
        .sort((a, b) => (a.Name > b.Name ? 1 : -1))
        .forEach((dataItem) => {
          try {
            Realm.write(() => {
              Realm.create('Vendor', {
                id: dataItem.No,
                name: dataItem.Name,
              }, true);
            });
          } catch (e) {
            console.log(e);
          }
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
