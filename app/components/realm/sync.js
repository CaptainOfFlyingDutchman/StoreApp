import Realm from './index';
import { fetchWrapper } from '../../request';
import { navUrl, getAuthorizationHeaderValue } from '../../config';

const settingFromRealm = Realm.objects('Setting');

this._navUrl = settingFromRealm.navUrl || navUrl;

if (settingFromRealm.navUser && settingFromRealm.navPassword) {
  this._authorizationHeaderValue =
    getAuthorizationHeaderValue(settingFromRealm.navUser, settingFromRealm.navPassword);
} else {
  this._authorizationHeaderValue = getAuthorizationHeaderValue();
}

export const syncData = (
  callback,
  { location = true, setting = true, item = false, vendor = false } = {}
) => {
  if (location) syncLocation();
  if (setting) syncSetting();
  if (item) syncItem();
  if (vendor) syncVendor();
};

const syncLocation = () => {
  fetchWrapper(`${this._navUrl}/Stores?$format=json`, this._authorizationHeaderValue)
    .then(response => response.json())
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

const syncSetting = () => {
  fetchWrapper(`${this._navUrl}/CompanySetting?$format=json`, this._authorizationHeaderValue)
    .then(response => response.json())
    .then((responseJson) => {
      responseJson.value.forEach((dataItem) => {
        try {
          Realm.write(() => {
            Realm.create('Setting', {
              navUrl: dataItem.navUrl,
              navUser: dataItem.navUser,
              navPassword: dataItem.navPassword,
              currentUser: '',
              returnReasonCode: dataItem.returnReasonCode || 'RRC'
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

const syncItem = () => {
  fetchWrapper(`${this._navUrl}/Barcodes?$format=json`, this._authorizationHeaderValue)
    .then(response => response.json())
    .then((responseJson) => {
      responseJson.value.forEach((dataItem) => {
        try {
          Realm.write(() => {
            Realm.create('Item', {
              barCode: dataItem.Bar_Code,
              no: dataItem.Item_No,
              description: dataItem.Description,
              unitCost: Number.parseFloat(dataItem.Unit_Cost),
              vendorId: dataItem.Vendor_No,
              vendorName: '',
              uom: dataItem.AuxiliaryIndex1
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

const syncVendor = () => {
  fetchWrapper(`${this._navUrl}/Vendors?$format=json`, this._authorizationHeaderValue)
    .then(response => response.json())
    .then((responseJson) => {
      responseJson.value.forEach((dataItem) => {
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
