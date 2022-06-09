const assert = require("assert").strict;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

require('../src/index');

chai.use(chaiHttp);
const url = 'http://localhost:4000/juego';


const palabraAAdivinar = "xyz";

describe("Test API del juego", () => {
  it("validar ruta de instanciacion de un nuevo juego", () => {
    chai.request(url)
      .post('/iniciarNuevaPartida')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').to.be.notEqual(undefined);
      });
  });
  
  it("validar ruta para definir una palabra a adivinar", () => {
    chai.request(url)
      .post('/definirPalabraAAdivinar')
      .send({ palabraAAdivinar })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('palabraAAdivinar').to.be.equal(palabraAAdivinar);
      });
  });

  it("validar ruta de arriesgar una letra", () => {
    chai.request(url)
      .post('/arriesgarLetra')
      .send({ letra: 'x' })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.be.notEqual(undefined);
      });
  });

  it("validar ruta de obtener las letras acertadas hasta el momento", () => {
    chai.request(url)
      .get('/palabrasAcertadas')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.be.notEqual(undefined);
      });
  });

  it("validar ruta de arriesgar una palabra", () => {
    chai.request(url)
      .post('/arriesgarPalabra')
      .send({ palabra: palabraAAdivinar })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.be.notEqual(undefined);
      });
  });
});