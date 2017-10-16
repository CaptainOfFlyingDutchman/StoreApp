import base64 from 'Base64';
import config from './config';

export const getEncodedCredentials = () =>
  `Basic ${base64.btoa(`${config.username}:${config.password}`)}`;

const postToServer = (submissionId, callback) => {
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

  const SoapEnvelopeNS = 'http://schemas.xmlsoap.org/soap/envelope/';
  const body = `<soap:Envelope xmlns:soap="${SoapEnvelopeNS}">
    <soap:Body xmlns:n="urn:microsoft-dynamics-schemas/codeunit/WebInvoice">
    <n:MobPdfMail xmlns="WebInvoiceNS">
    <n:submissionId>${submissionId}</n:submissionId>
    </n:MobPdfMail>
    </soap:Body>
    </soap:Envelope>`;

  xmlhttp.open('POST', 'http://navserver.baqala.me:9347/Nav9Mob/WS/Bodega%20Grocery%20Company%20LIVE/Codeunit/WebInvoice');
  xmlhttp.setRequestHeader('Content-type', 'text/xml; charset=utf-8');
  xmlhttp.setRequestHeader('Content-length', body.length);
  xmlhttp.setRequestHeader('SOAPAction', 'MobPdfMail');
  xmlhttp.setRequestHeader('Authorization', getEncodedCredentials());
  xmlhttp.send(body);
};

export {
  postToServer
};
