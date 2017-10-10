import Realm from 'realm';

class Location extends Realm.Object {}
Location.schema = {
  name: 'Location',
  primaryKey: 'Id',
  properties: {
    Id: 'string',
    Name:'string',
    Password: {type:'string', default: ''}
  },
};

class Vendor extends Realm.Object {}
Vendor.schema = {
  name: 'Vendor',
  primaryKey: 'Id',
  properties: {
    Id: 'string',
    Name: 'string'
  }
};

class Item extends Realm.Object {}
Item.schema = {
  name: 'Item',
  primaryKey: 'barcode',
  properties: {
    barcode: 'string',
    No: { type: 'string' },
    description: { type: 'string', indexed: true },
    unitCost: 'double',
    vendorId: 'string',
    vendorName: {type: 'string', default: ''}
  },
};

class Setting extends Realm.Object {}
Setting.schema = {
  name: 'Setting',
  properties: {
    navUrl: 'string',
    navUser: 'string',
    navPassword: 'string',
    currentUser: 'string'
  }
};

class Header extends Realm.Object {}
Header.schema = {
  name: 'Header',
  primaryKey: 'submissionId',
  properties: {
    submissionId: 'string',
    transDate: 'date',
    vendorId: 'string',
    refNo: 'string',
    returnReason: {type: 'string', default: ''},
    totalValue: 'double',
    refImage: 'data',
    Signature: 'data'
  }
};

class ItemLine extends Realm.Object {}
ItemLine.schema = {
  name: 'ItemLine',
  primaryKey: ('submissionId','LineNo'),
  properties: {
    submissionId: 'string',
    LineNo: 'int',
    barcode: 'string',
    itemId: 'string',
    quantity: 'double',
    UoM: {type: 'string', deafult: 'pcs'},
    itemCost: 'double',
    totalLineCost: 'double'
  }
};

class ReqLine extends Realm.Object {}
ReqLine.schema = {
  name: 'ReqLine',
  primaryKey: ('submissionId','LineNo'),
  properties: {
    submissionId: 'string',
    LineNo: 'int',
    barcode: 'string',
    itemId: 'string',
    quantity: 'double',
    UoM: {type: 'string', deafult: 'pcs'},
  }
};

class AllSubmission extends Realm.Object {}
AllSubmission.schema = {
  name: 'AllSubmission',
  primaryKey: ('submissionId'),
  properties: {
    submissionId: 'string',
    type: 'string',
    submissionDate: 'date'
  }
};



export default new Realm({ schema: [Location,Vendor,Item,ReqLine, Header,ItemLine,AllSubmission,Setting], schemaVersion: 3 });
