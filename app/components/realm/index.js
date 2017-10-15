import Realm from 'realm';

class Location extends Realm.Object {}
Location.schema = {
  name: 'Location',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    password: { type: 'string', default: '' }
  },
};

class Vendor extends Realm.Object {}
Vendor.schema = {
  name: 'Vendor',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
};

class Item extends Realm.Object {}
Item.schema = {
  name: 'Item',
  primaryKey: 'barCode',
  properties: {
    barCode: 'string',
    no: { type: 'string' },
    description: { type: 'string', indexed: true },
    unitCost: 'double',
    vendorId: 'string',
    vendorName: { type: 'string', default: '' },
    uom: { type: 'string', default: '' }
  },
};

class Setting extends Realm.Object {}
Setting.schema = {
  name: 'Setting',
  properties: {
    navUrl: 'string',
    navUser: 'string',
    navPassword: 'string',
    currentUser: 'string',
    returnReasonCode: 'string'
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
    returnReason: { type: 'string', default: '' },
    totalValue: 'double',
    refImage: 'data',
    signature: 'data'
  }
};

class ItemLine extends Realm.Object {}
ItemLine.schema = {
  name: 'ItemLine',
  primaryKey: ('submissionId', 'lineNo'),
  properties: {
    submissionId: 'string',
    lineNo: 'int',
    barCode: 'string',
    itemId: 'string',
    quantity: 'double',
    uom: { type: 'string', default: 'pcs' },
    itemCost: 'double',
    totalLineCost: 'double'
  }
};

class ReqLine extends Realm.Object {}
ReqLine.schema = {
  name: 'ReqLine',
  primaryKey: ('submissionId', 'lineNo'),
  properties: {
    submissionId: 'string',
    lineNo: 'int',
    barCode: 'string',
    itemId: 'string',
    quantity: 'double',
    uom: { type: 'string', default: 'pcs' },
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

export default new Realm({
  schema: [Location, Vendor, Item, ReqLine, Header, ItemLine, AllSubmission, Setting],
  schemaVersion: 3
});
