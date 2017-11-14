import { getAuthorizationHeaderValue } from './config';

const buildItemLines = itemLines => itemLines.map(itemLine =>
  `<n:lines>${itemLine.barCodeData},${itemLine.barCodeItem.no},${itemLine.quantity},${itemLine.itemCost}</n:lines>`);

export const postToServer = ({
  submissionId, transactionType, store, transactionDate, vendorId,
  referenceNumber, receiverName, returnReasonCode, invoiceReferenceImage, signatureImage
}, itemLines, callback) => {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState !== 4) {
      return;
    }

    if (xmlhttp.status === 200) {
      callback.call(xmlhttp, 200);
    } else {
      callback.call(xmlhttp);
    }
  };

  // Header -- SubmissionId,TransType,Store,TransactionDate,VendorCode,RefNo,ReceiverName,
  //            ReturnReasonCode
  // Line -- Barcode,ItemId,Qty,Price

  const body = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body xmlns:n="urn:microsoft-dynamics-schemas/codeunit/WebInvoice">
        <n:UpdateMobData xmlns="WebInvoiceNS">
          <n:header>${submissionId},${transactionType},${store},${transactionDate},${vendorId},${referenceNumber},${receiverName},${returnReasonCode}</n:header>
          ${buildItemLines(itemLines).join('')}
          <n:signature>${signatureImage}</n:signature>
          <n:attachment>${invoiceReferenceImage}</n:attachment>
        </n:UpdateMobData>
      </soap:Body>
    </soap:Envelope>
  `;

  console.log(body);

  xmlhttp.open('POST', 'http://navserver.baqala.me:9347/Nav9Mob/WS/Bodega%20Grocery%20Company%20LIVE/Codeunit/WebInvoice');
  xmlhttp.setRequestHeader('Content-type', 'text/xml; charset=utf-8');
  xmlhttp.setRequestHeader('Content-length', body.length);
  xmlhttp.setRequestHeader('SOAPAction', 'UpdateMobData');
  xmlhttp.setRequestHeader('Authorization', getAuthorizationHeaderValue());
  xmlhttp.send(body);
};

export const fetchWrapper = (url, authorizationHeaderValue = '', method = 'GET') => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  headers = authorizationHeaderValue ?
    { ...headers, Authorization: authorizationHeaderValue } : headers;

  return fetch(url, {
    method,
    headers
  });
};
